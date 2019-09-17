const AbstractRepository = require('./abstractRepository');
const models = require('../models');
const AuditLogRepository = require('./auditLogRepository');

module.exports = class SettingsRepository extends AbstractRepository {
  static async findOrCreateDefault(defaults, options) {
    const [settings] = await models.settings.findOrCreate({
      where: { id: 'default' },
      defaults: {
        ...defaults,
        id: 'default',
        createdById: this.getCurrentUser(options)
          ? this.getCurrentUser(options).id
          : null,
      },
    });

    return settings;
  }

  static async save(data, options) {
    const settings = await this.findOrCreateDefault(data);

    await settings.update(data, {
      transaction: this.getTransaction(options),
    });

    await AuditLogRepository.log(
      {
        entityName: 'settings',
        entityId: 'default',
        action: AuditLogRepository.UPDATE,
        values: data,
      },
      options,
    );

    return settings;
  }
};
