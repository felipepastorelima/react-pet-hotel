const models = require('../models');
const SequelizeFilter = require('../utils/sequelizeFilter');
const AbstractRepository = require('./abstractRepository');

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
    const log = await models.auditLog.create(
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
      { transaction: this.getTransaction(options) },
    );

    return log;
  }

  static async findAndCountAll({
    filter,
    limit = 0,
    offset = 0,
    orderBy = null,
  }) {
    const sequelizeFilter = new SequelizeFilter(
      models.Sequelize,
    );

    if (filter) {
      if (filter.timestampRange) {
        sequelizeFilter.appendRange(
          'timestamp',
          filter.timestampRange,
        );
      }

      if (filter.action) {
        sequelizeFilter.appendEqual(
          'action',
          filter.action,
        );
      }

      if (filter.entityId) {
        sequelizeFilter.appendEqual(
          'entityId',
          filter.entityId,
        );
      }

      if (filter.createdByEmail) {
        sequelizeFilter.appendIlike(
          'createdByEmail',
          filter.createdByEmail,
          'auditLog',
        );
      }

      if (filter.entityNames && filter.entityNames.length) {
        sequelizeFilter.appendIn(
          'entityName',
          filter.entityNames,
        );
      }
    }

    return models.auditLog.findAndCountAll({
      where: sequelizeFilter.getWhere(),
      include: sequelizeFilter.getInclude(),
      limit: limit ? limit : undefined,
      offset: offset || undefined,
      order: orderBy
        ? [orderBy.split('_')]
        : [['timestamp', 'DESC']],
    });
  }
};
