const database = require('../database');
const config = require('../../../config')();

module.exports = class AbstractRepository {
  static async cleanDatabase() {
    if (process.env.NODE_ENV !== 'test') {
      throw new Error(
        'Clean database only allowed for test!',
      );
    }

    return database.connection.dropDatabase();
  }

  static getCurrentUser(options) {
    return (options && options.currentUser) || { id: null };
  }

  static getSession(options) {
    return (options && options.session) || undefined;
  }

  static async createSession() {
    if (!config.database.transactions) {
      return;
    }

    const session = await database.connection.startSession();
    await session.startTransaction();
    return session;
  }

  static async commitTransaction(session) {
    if (!config.database.transactions) {
      return;
    }

    return session.commitTransaction();
  }

  static async abortTransaction(session) {
    if (!config.database.transactions) {
      return;
    }

    return session.abortTransaction();
  }

  static async wrapWithSessionIfExists(toWrap, options) {
    if (!this.getSession(options)) {
      return toWrap;
    }

    return toWrap.session(this.getSession(options));
  }

  static getSessionOptionsIfExists(options) {
    if (!this.getSession(options)) {
      return undefined;
    }

    return { session: this.getSession(options) };
  }

  getCurrentUser(options) {
    return AbstractRepository.getCurrentUser(options);
  }

  getSession(options) {
    return AbstractRepository.getSession(options);
  }

  async createSession() {
    return AbstractRepository.createSession();
  }

  async commitTransaction(session) {
    return AbstractRepository.commitTransaction(session);
  }

  async abortTransaction(session) {
    return AbstractRepository.abortTransaction(session);
  }

  async wrapWithSessionIfExists(toWrap, options) {
    return AbstractRepository.wrapWithSessionIfExists(
      toWrap,
      options,
    );
  }

  getSessionOptionsIfExists(options) {
    return AbstractRepository.getSessionOptionsIfExists(
      options,
    );
  }
};
