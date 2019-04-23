const BookingRepository = require('../database/repositories/bookingRepository');
const ValidationError = require('../errors/validationError');
const AbstractRepository = require('../database/repositories/abstractRepository');
const UserRoleChecker = require('./iam/userRoleChecker');
const ForbiddenError = require('../errors/forbiddenError');

module.exports = class BookingService {
  constructor({ currentUser, language }) {
    this.repository = new BookingRepository();
    this.currentUser = currentUser;
    this.language = language;
  }

  async create(data) {
    await this._validateCreate(data);

    const session = await AbstractRepository.createSession();

    try {
      const record = await this.repository.create(data, {
        session,
        currentUser: this.currentUser,
      });

      await AbstractRepository.commitTransaction(session);

      return record;
    } catch (error) {
      await AbstractRepository.abortTransaction(session);
      throw error;
    }
  }

  async _validateCreate(data) {
    if (UserRoleChecker.isPetOwner(this.currentUser)) {
      if (data.owner !== this.currentUser.id) {
        throw new ForbiddenError(this.language);
      }
    }
  }

  async update(id, data) {
    await this._validateUpdate(id, data);

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

  async _validateUpdate(id, data) {
    if (UserRoleChecker.isPetOwner(this.currentUser)) {
      data.owner = this.currentUser.id;
      await this._validateIsSameOwner(id);
    }
  }

  async _validateIsSameOwner(id) {
    await this.findById(id);
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
    const record = await this.repository.findById(id);
    await this._validateFindById(record);
    return record;
  }

  async _validateFindById(record) {
    if (UserRoleChecker.isPetOwner(this.currentUser)) {
      if (
        record.owner &&
        record.owner.id !== this.currentUser.id
      ) {
        throw new ForbiddenError(this.language);
      }
    }
  }

  async findAllAutocomplete(filter, limit) {
    if (UserRoleChecker.isPetOwner(this.currentUser)) {
      if (
        !filter ||
        !filter.owner ||
        filter.owner !== this.currentUser.id
      ) {
        throw new ForbiddenError(this.language);
      }
    }

    return this.repository.findAllAutocomplete(
      filter,
      limit,
    );
  }

  async findAndCountAll(args) {
    if (UserRoleChecker.isPetOwner(this.currentUser)) {
      args.filter = {
        ...args.filter,
        owner: this.currentUser.id,
      };
    }

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
