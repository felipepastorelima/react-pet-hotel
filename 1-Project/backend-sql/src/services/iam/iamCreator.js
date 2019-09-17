const assert = require('assert');
const InvitationEmail = require('../../emails/invitationEmail');
const ValidationError = require('../../errors/validationError');
const EmailSender = require('../shared/email/emailSender');
const UserRepository = require('../../database/repositories/userRepository');

module.exports = class IamCreator {
  constructor(currentUser, language) {
    this.currentUser = currentUser;
    this.language = language;

    this.transaction = null;
    this.emailsToInvite = [];
    this.data = null;
    this.sendInvitationEmails = false;
  }

  async execute(data, sendInvitationEmails = true) {
    this.data = data;
    this.sendInvitationEmails = sendInvitationEmails;

    await this._validate();

    try {
      this.transaction = await UserRepository.createTransaction();

      if (this.emails.length === 1) {
        await this._addOrUpdateOneOfOne();
      } else {
        await this._addOrUpdateMany();
      }

      await UserRepository.commitTransaction(
        this.transaction,
      );
    } catch (error) {
      await UserRepository.rollbackTransaction(
        this.transaction,
      );
      throw error;
    }

    if (this._hasEmailsToInvite) {
      await this._sendAllInvitationEmails();
    }
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

  get _emails() {
    if (
      this.data.emails &&
      !Array.isArray(this.data.emails)
    ) {
      this.emails = [this.data.emails];
    } else {
      const uniqueEmails = [...new Set(this.data.emails)];
      this.emails = uniqueEmails;
    }

    return this.emails.map((email) => email.trim());
  }

  async _addOrUpdateOneOfOne() {
    const email = this.emails[0];

    const exists =
      (await UserRepository.count(
        { email },
        { transaction: this.transaction },
      )) > 0;

    if (exists) {
      throw new ValidationError(
        this.language,
        'iam.errors.userAlreadyExists',
      );
    }

    await UserRepository.create(
      {
        ...this.data,
        email,
        roles: this._roles,
      },
      {
        currentUser: this.currentUser,
        transaction: this.transaction,
      },
    );

    this.emailsToInvite.push(email);
  }

  async _addOrUpdateMany() {
    return Promise.all(
      this.emails.map((email) =>
        this._addOrUpdateOneOfMany(email),
      ),
    );
  }

  async _addOrUpdateOneOfMany(email) {
    let user = await UserRepository.findByEmailWithoutAvatar(
      email,
      {
        transaction: this.transaction,
      },
    );

    if (user) {
      await UserRepository.updateRoles(
        user.id,
        this._roles,
        {
          addRoles: true,
          currentUser: this.currentUser,
          transaction: this.transaction,
        },
      );
    } else {
      await UserRepository.create(
        { email, roles: this._roles },
        {
          currentUser: this.currentUser,
          transaction: this.transaction,
        },
      );

      this.emailsToInvite.push(email);
    }
  }

  get _hasEmailsToInvite() {
    return (
      this.emailsToInvite && this.emailsToInvite.length
    );
  }

  async _sendAllInvitationEmails() {
    if (!this.sendInvitationEmails) {
      return;
    }

    return Promise.all(
      this.emailsToInvite.map((emailToInvite) => {
        const invitationEmail = new InvitationEmail(
          this.language,
          emailToInvite,
        );

        return new EmailSender(invitationEmail).send();
      }),
    );
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

    assert(
      this._roles && this._roles.length,
      'roles is required',
    );
  }
};
