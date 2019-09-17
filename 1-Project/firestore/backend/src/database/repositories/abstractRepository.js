const admin = require('firebase-admin');
const lodash = require('lodash');

module.exports = class AbstractRepository {
  static async cleanDatabase() {
    throw new Error('Not implemented');
  }

  static newId() {
    return admin
      .firestore()
      .collection(`ids`)
      .doc().id;
  }

  static serverTimestamp() {
    return admin.firestore.FieldValue.serverTimestamp();
  }

  static async findRelation(collectionName, value) {
    if (!value) {
      return value;
    }

    if (Array.isArray(value)) {
      return this.findDocuments(collectionName, value);
    }

    return this.findDocument(collectionName, value);
  }

  static async findDocument(collectionName, id) {
    return this.mapDocument(
      await admin
        .firestore()
        .doc(`${collectionName}/${id}`)
        .get(),
    );
  }

  static async findDocuments(collectionName, ids) {
    return Promise.all(
      ids.map((id) =>
        this.findDocument(collectionName, id),
      ),
    );
  }

  static getCurrentUser(options) {
    return (options && options.currentUser) || { id: null };
  }

  static getBatch(options) {
    return (options && options.batch) || undefined;
  }

  static async createBatch() {
    return admin.firestore().batch();
  }

  static async commitBatch(batch) {
    return batch.commit();
  }

  static async executeOrAddToBatch(
    operation,
    document,
    data,
    options,
  ) {
    const batch = this.getBatch(options);

    if (batch) {
      if (operation !== 'delete') {
        batch[operation](document, data);
      } else {
        batch[operation](document);
      }
      return;
    }

    if (operation !== 'delete') {
      return document[operation](data);
    } else {
      return document[operation];
    }
  }

  static mapCollection(collection) {
    if (collection.empty) {
      return [];
    }

    const list = [];

    collection.forEach((document) => {
      const item = Object.assign({}, document.data(), {
        id: document.id,
      });

      this.replaceAllTimestampToDate(item);
      list.push(item);
    });

    return list;
  }

  static mapDocument(document) {
    if (!document.exists) {
      return null;
    }

    const item = Object.assign({}, document.data(), {
      id: document.id,
    });

    this.replaceAllTimestampToDate(item);

    return item;
  }

  static replaceAllTimestampToDate(arg) {
    if (!arg) {
      return arg;
    }

    Object.keys(arg).forEach((key) => {
      if (
        arg[key] &&
        arg[key] instanceof admin.firestore.Timestamp
      ) {
        arg[key] = arg[key].toDate();
      }
    });
  }

  static convertToTimestampIfIsNot(value) {
    if (!value) {
      return value;
    }

    if (!(value instanceof admin.firestore.Timestamp)) {
      if (lodash.isNumber(value)) {
        return admin.firestore.Timestamp.fromMillis(value);
      }

      if (lodash.isDate(value)) {
        return admin.firestore.Timestamp.fromDate(value);
      }

      throw new Error(`Error adding audition fields!`);
    }

    return value;
  }

  getCurrentUser(options) {
    return AbstractRepository.getCurrentUser(options);
  }

  getBatch(options) {
    return AbstractRepository.getBatch(options);
  }

  async createBatch() {
    return AbstractRepository.createBatch();
  }

  async commitBatch(batch) {
    return AbstractRepository.commitBatch(batch);
  }

  async executeOrAddToBatch(
    operation,
    document,
    data,
    options,
  ) {
    return AbstractRepository.executeOrAddToBatch(
      operation,
      document,
      data,
      options,
    );
  }

  mapDocument(document) {
    return AbstractRepository.mapDocument(document);
  }

  mapCollection(collection) {
    return AbstractRepository.mapCollection(collection);
  }

  newId() {
    return AbstractRepository.newId();
  }

  async findRelation(collectionName, value) {
    return AbstractRepository.findRelation(
      collectionName,
      value,
    );
  }

  findDocument(collectionName, id) {
    return AbstractRepository.findDocument(
      collectionName,
      id,
    );
  }

  findDocuments(collectionName, ids) {
    return AbstractRepository.findDocuments(
      collectionName,
      ids,
    );
  }

  serverTimestamp() {
    return AbstractRepository.serverTimestamp();
  }
};
