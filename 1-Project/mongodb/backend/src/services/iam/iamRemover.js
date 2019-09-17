const Roles = require('../../security/roles');
const UserRepository = require('../../database/repositories/userRepository');
const UserRoleRepository = require('../../database/repositories/userRoleRepository');
const assert = require('assert');
const ValidationError = require('../../errors/validationError');

module.exports = class IamRemover {
  constructor(currentUser, language) {
    this.currentUser = currentUser;
    this.language = language;

    this.session = null;
    this.emailsToInvite = [];
  }

  async removeAll(data) {
    this.data = data;

    await this._validate();

    try {
      this.session = await UserRepository.createSession();

      await this._removeInformedRolesFromAll();
      return UserRepository.commitTransaction(this.session);
    } catch (error) {
      await UserRepository.abortTransaction(this.session);
      throw error;
    }
  }

  get _emails() {
    let emails;

    if (
      this.data.emails &&
      !Array.isArray(this.data.emails)
    ) {
      emails = [this.data.emails];
    } else {
      const uniqueEmails = [...new Set(this.data.emails)];
      emails = uniqueEmails;
    }

    return emails.map((email) => email.trim());
  }

  get _roles() {
    if (
      this.data.roles &&
      !Array.isArray(this.data.roles)
    ) {
      return [this.data.roles];
    } else {
      const uniqueRoles = [...new Set(this.data.roles)];
      return uniqueRoles;
    }
  }

  async _removeInformedRolesFromAll() {
    if (this._noUpdates) {
      return;
    }

    return Promise.all(
      this._emails.map((email) =>
        this._removeInformedRoles(email),
      ),
    );
  }

  async _removeInformedRoles(email) {
    if (this._noUpdates) {
      return;
    }

    const user = await UserRepository.findByEmailWithoutAvatar(
      email,
      {
        session: this.session,
      },
    );

    if (user) {
      await UserRepository.updateRoles(
        user.id,
        this.data.all ? [] : this._roles,
        {
          removeOnlyInformedRoles: !this.data.all,
          currentUser: this.currentUser,
          session: this.session,
        },
      );
    }
  }

  get _noUpdates() {
    return (
      !this.data.all &&
      (!this._roles || !this._roles.length)
    );
  }

  async _isRemovingOwnOwnerRole() {
    if (
      !this.data.all &&
      !this._roles.includes(Roles.values.owner)
    ) {
      return false;
    }

    if (!this._emails.includes(this.currentUser.email)) {
      return false;
    }

    const currentUserRoles = await UserRoleRepository.findAllByUser(
      this.currentUser.id,
    );

    return currentUserRoles.includes(Roles.values.owner);
  }

  async _validate() {
    assert(this.currentUser, 'currentUser is required');
    assert(
      this.currentUser.id,
      'currentUser.id is required',
    );
    assert(
      this.currentUser.email,
      'currentUser.email is required',
    );
    assert(
      this._emails && this._emails.length,
      'emails is required',
    );
    assert(this._roles, 'roles is required (can be empty)');

    if (await this._isRemovingOwnOwnerRole()) {
      throw new ValidationError(
        this.language,
        'iam.errors.revokingOwnPermission',
      );
    }
  }
};
