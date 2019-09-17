const SettingsRepository = require('../database/repositories/settingsRepository');

const DEFAULT_SETTINGS = {
  id: 'default',
  theme: 'default',
};

class SettingsService {
  static async findOrCreateDefault(currentUser) {
    return SettingsRepository.findOrCreateDefault(
      DEFAULT_SETTINGS,
      { currentUser },
    );
  }

  static async save(data, currentUser) {
    const batch = await SettingsRepository.createBatch();

    const settings = await SettingsRepository.save(data, {
      currentUser,
      batch,
    });

    await SettingsRepository.commitBatch(batch);

    return settings;
  }
}

module.exports = SettingsService;
