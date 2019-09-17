const admin = require('firebase-admin');
const AbstractRepository = require('./abstractRepository');
const AuditLogRepository = require('./auditLogRepository');
const Settings = require('../models/settings');

module.exports = class SettingsRepository extends AbstractRepository {
  static async findOrCreateDefault(defaults, options) {
    const first = await this.findDocument(
      new Settings().collectionName,
      'default',
    );

    if (first) {
      return first;
    }

    const settings = {
      id: 'default',
      ...defaults,
    };

    await this.executeOrAddToBatch(
      'set',
      admin.firestore().doc(`settings/default`),
      settings,
      options,
    );

    return settings;
  }

  static async save(data, options) {
    data = new Settings().cast(data);

    await this.executeOrAddToBatch(
      'update',
      admin
        .firestore()
        .doc(`${new Settings().collectionName}/default`),
      data,
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'settings',
        entityId: 'default',
        action: AuditLogRepository.UPDATE,
        values: data,
      },
      options,
    );

    return {
      id: 'default',
      ...data,
    };
  }
};
