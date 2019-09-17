const AbstractRepository = require('./abstractRepository');
const admin = require('firebase-admin');
const FirebaseQuery = require('../utils/firebaseQuery');

module.exports = class AuditLogRepository extends AbstractRepository {
  static get CREATE() {
    return 'create';
  }
  static get UPDATE() {
    return 'update';
  }
  static get DELETE() {
    return 'delete';
  }

  static async log(
    { entityName, entityId, action, values },
    options,
  ) {
    const log = {
      id: this.newId(),
      entityName,
      entityId,
      action,
      values,
      timestamp: new Date(),
      createdById:
        options && options.currentUser
          ? options.currentUser.id
          : null,
      createdByEmail:
        options && options.currentUser
          ? options.currentUser.email
          : null,
    };

    await this.executeOrAddToBatch(
      'set',
      admin.firestore().doc(`auditLogs/${log.id}`),
      log,
      options,
    );

    return log;
  }

  static async findAndCountAll({
    filter,
    limit = 0,
    offset = 0,
    orderBy = null,
  }) {
    const query = FirebaseQuery.forList({
      limit,
      offset,
      orderBy: orderBy || 'createdAt_DESC',
    });

    if (filter) {
      if (filter.timestampRange) {
        query.appendRange(
          'timestamp',
          filter.timestampRange,
        );
      }

      if (filter.action) {
        query.appendEqual('action', filter.action);
      }

      if (filter.entityId) {
        query.appendEqual('entityId', filter.entityId);
      }

      if (filter.createdByEmail) {
        query.appendIlike(
          'createdByEmail',
          filter.createdByEmail,
        );
      }

      if (filter.entityNames && filter.entityNames.length) {
        query.appendIn('entityName', filter.entityNames);
      }
    }

    const collection = await admin
      .firestore()
      .collection(`auditLogs`)
      .get();

    const all = this.mapCollection(collection);
    const rows = query.rows(all);
    const count = query.count(all);

    return { rows, count };
  }
};
