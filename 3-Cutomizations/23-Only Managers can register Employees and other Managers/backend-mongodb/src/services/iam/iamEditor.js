const Roles = require('../../security/roles');
const assert = require('assert');
const ValidationError = require('../../errors/validationError');
const UserRepository = require('../../database/repositories/userRepository');
const UserRoleRepository = require('../../database/repositories/userRoleRepository');
const AuthService = require('../../auth/authService');
const UserRoleChecker = require('./userRoleChecker');
const ForbiddenError = require('../../errors/forbiddenError');

module.exports = class IamEditor {
  constructor(currentUser, language) {
    this.currentUser = currentUser;
    this.language = language;

    this.data = null;
    this.session = null;
    this.user = null;
  }

  async update(data) {
    this.data = data;

    await this._validate();

    try {
      this.session = await UserRepository.createSession();

      await this._loadUser();
      this._validateAllowedRoles();
      await this._updateAtDatabase();

      await UserRepository.commitTransaction(this.session);
    } catch (error) {
      await UserRepository.abortTransaction(this.session);

      throw error;
    }

    await this._updateAtAuthentication();
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

  async _loadUser() {
    this.user = await UserRepository.findById(
      this.data.id,
      { session: this.session },
    );

    if (!this.user) {
      throw new ValidationError(
        this.language,
        'iam.errors.userNotFound',
      );
    }
  }

  async _updateAtDatabase() {
    this.user = await UserRepository.update(
      this.data.id,
      this.data,
      {
        currentUser: this.currentUser,
        session: this.session,
      },
    );
  }

  async _updateAtAuthentication() {
    if (this.user.authenticationUid) {
      await AuthService.updateUser(
        this.user.authenticationUid,
        this.user,
      );
    }
  }

  async _isRemovingOwnManagerRole() {
    if (this._roles.includes(Roles.values.manager)) {
      return false;
    }

    if (this.data.id !== this.currentUser.id) {
      return false;
    }

    const currentUserRoles = await UserRoleRepository.findAllByUser(
      this.currentUser.id,
    );

    return currentUserRoles.includes(Roles.values.manager);
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

    assert(this.data.id, 'id is required');
    assert(this._roles, 'roles is required (can be empty)');

    if (await this._isRemovingOwnManagerRole()) {
      throw new ValidationError(
        this.language,
        'iam.errors.revokingOwnPermission',
      );
    }
  }

  _validateAllowedRoles() {
    if (UserRoleChecker.isManager(this.currentUser)) {
      return;
    }

    const pastRoles = this.user.roles || [];

    if (
      pastRoles.includes(Roles.values.manager) ||
      pastRoles.includes(Roles.values.employee)
    ) {
      throw new ForbiddenError(this.language);
    }

    if (!this._roles.includes(Roles.values.petOwner)) {
      throw new ForbiddenError(this.language);
    }

    if (
      this._roles.includes(Roles.values.manager) ||
      this._roles.includes(Roles.values.employee)
    ) {
      throw new ForbiddenError(this.language);
    }
  }
};
