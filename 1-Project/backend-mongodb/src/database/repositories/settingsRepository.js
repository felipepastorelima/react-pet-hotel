const AbstractRepository = require('./abstractRepository');
const Settings = require('../models/settings');
const AuditLogRepository = require('./auditLogRepository');

module.exports = class SettingsRepository extends AbstractRepository {
  static async findOrCreateDefault(defaults, options) {
    const first = await this.wrapWithSessionIfExists(
      Settings.findOne(),
      options,
    );

    if (first) {
      return first;
    }

    const [settings] = await Settings.create(
      [
        {
          ...defaults,
          createdBy: this.getCurrentUser(options)
            ? this.getCurrentUser(options).id
            : null,
        },
      ],
      this.getSessionOptionsIfExists(options),
    );

    return settings;
  }

  static async save(data, options) {
    await this.wrapWithSessionIfExists(
      Settings.updateMany(undefined, data),
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

    return this.wrapWithSessionIfExists(
      Settings.findOne(),
      options,
    );
  }
};
