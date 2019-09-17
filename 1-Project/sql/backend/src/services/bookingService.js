const BookingRepository = require('../database/repositories/bookingRepository');
const ValidationError = require('../errors/validationError');
const AbstractRepository = require('../database/repositories/abstractRepository');

module.exports = class BookingService {
  constructor({ currentUser, language }) {
    this.repository = new BookingRepository();
    this.currentUser = currentUser;
    this.language = language;
  }

  async create(data) {
    const transaction = await AbstractRepository.createTransaction();

    try {
      const record = await this.repository.create(data, {
        transaction,
        currentUser: this.currentUser,
      });

      await AbstractRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await AbstractRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async update(id, data) {
    const transaction = await AbstractRepository.createTransaction();

    try {
      const record = await this.repository.update(
        id,
        data,
        {
          transaction,
          currentUser: this.currentUser,
        },
      );

      await AbstractRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await AbstractRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async destroyAll(ids) {
    const transaction = await AbstractRepository.createTransaction();

    try {
      for (const id of ids) {
        await this.repository.destroy(id, {
          transaction,
          currentUser: this.currentUser,
        });
      }

      await AbstractRepository.commitTransaction(
        transaction,
      );
    } catch (error) {
      await AbstractRepository.rollbackTransaction(
        transaction,
      );
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
