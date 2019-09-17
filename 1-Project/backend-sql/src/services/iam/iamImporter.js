const ValidationError = require('../../errors/validationError');
const UserRepository = require('../../database/repositories/userRepository');
const IamCreator = require('./iamCreator');

const SEND_INVITATION_EMAIL = false;

module.exports = class IamImporter {
  constructor(currentUser, language) {
    this.currentUser = currentUser;
    this.language = language;
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new ValidationError(
        this.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new ValidationError(
        this.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      emails: [data.email],
      ...data,
      importHash,
    };

    return new IamCreator(
      this.currentUser,
      this.language,
    ).execute(dataToCreate, SEND_INVITATION_EMAIL);
  }

  async _isImportHashExistent(importHash) {
    const count = await UserRepository.count({
      importHash,
    });
    return count > 0;
  }
};
