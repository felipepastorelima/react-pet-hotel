const assert = require('assert');
const UserRepository = require('../../database/repositories/userRepository');
const AuthService = require('../../auth/authService');

module.exports = class AuthProfileEditor {
  constructor(currentUser, language) {
    this.currentUser = currentUser;
    this.language = language;

    this.session = null;
  }

  async execute(data) {
    this.data = data;

    await this._validate();

    try {
      this.session = await UserRepository.createSession();

      await this._loadUser();
      await this._updateAtDatabase();

      await UserRepository.commitTransaction(this.session);
    } catch (error) {
      await UserRepository.abortTransaction(this.session);
      throw error;
    }

    await this._updateAtAuthentication();
  }

  async _loadUser() {
    this.user = await UserRepository.findById(
      this.currentUser.id,
      { session: this.session },
    );
  }

  async _updateAtDatabase() {
    this.user = await UserRepository.updateProfile(
      this.currentUser.id,
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

    assert(this.data, 'profile is required');
  }
};
