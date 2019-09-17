const assert = require('assert');
const UserRepository = require('../../database/repositories/userRepository');
const AuthService = require('../../auth/authService');

module.exports = class AuthProfileEditor {
  constructor(currentUser, language) {
    this.currentUser = currentUser;
    this.language = language;

    this.batch = null;
  }

  async execute(data) {
    this.data = data;

    await this._validate();

    try {
      this.batch = await UserRepository.createBatch();

      await this._loadUser();
      await this._updateAtDatabase();

      await UserRepository.commitBatch(this.batch);
    } catch (error) {
      throw error;
    }

    await this._updateAtAuthentication();
  }

  async _loadUser() {
    this.user = await UserRepository.findById(
      this.currentUser.id,
    );
  }

  async _updateAtDatabase() {
    this.user = await UserRepository.updateProfile(
      this.currentUser.id,
      this.data,
      {
        currentUser: this.currentUser,
        batch: this.batch,
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
