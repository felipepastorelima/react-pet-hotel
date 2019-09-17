const AuditLog = require('../models/auditLog');
const AbstractRepository = require('./abstractRepository');
const MongooseQuery = require('../utils/mongooseQuery');

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
    await AuditLog.createCollection();
    const [log] = await AuditLog.create(
      [
        {
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
        },
      ],
      this.getSessionOptionsIfExists(options),
    );

    return log;
  }

  static async findAndCountAll({
    filter,
    limit = 0,
    offset = 0,
    orderBy = null,
  }) {
    const query = MongooseQuery.forList({
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

    const rows = await AuditLog.find(query.criteria)
      .skip(query.skip)
      .limit(query.limit)
      .sort(query.sort);

    const count = await AuditLog.countDocuments(
      query.criteria,
    );

    return { rows, count };
  }
};
