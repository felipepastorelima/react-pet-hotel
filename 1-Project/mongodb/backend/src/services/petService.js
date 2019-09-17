const PetRepository = require('../database/repositories/petRepository');
const ValidationError = require('../errors/validationError');
const AbstractRepository = require('../database/repositories/abstractRepository');

module.exports = class PetService {
  constructor({ currentUser, language }) {
    this.repository = new PetRepository();
    this.currentUser = currentUser;
    this.language = language;
  }

  async create(data) {
    const session = await AbstractRepository.createSession();

    try {
      const record = await this.repository.create(data, {
        session: session,
        currentUser: this.currentUser,
      });

      await AbstractRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await AbstractRepository.abortTransaction(session);
      throw error;
    }
  }

  async update(id, data) {
    const session = await AbstractRepository.createSession();

    try {
      const record = await this.repository.update(
        id,
        data,
        {
          session,
          currentUser: this.currentUser,
        },
      );

      await AbstractRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await AbstractRepository.abortTransaction(session);
      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await AbstractRepository.createSession();

    try {
      for (const id of ids) {
        await this.repository.destroy(id, {
          session,
          currentUser: this.currentUser,
        });
      }

      await AbstractRepository.commitTransaction(session);
    } catch (error) {
      await AbstractRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return this.repository.findById(id);
  }

  async findAllAutocomplete(search, limit) {
    return this.repository.findAllAutocomplete(search, limit);
  }

  async findAndCountAll(args) {
    return this.repository.findAndCountAll(args);
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
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await this.repository.count({
      importHash,
    });

    return count > 0;
  }
};
