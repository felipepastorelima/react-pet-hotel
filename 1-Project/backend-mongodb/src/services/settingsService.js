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
    const session = await SettingsRepository.createSession();

    const settings = await SettingsRepository.save(data, {
      currentUser,
      session,
    });

    await SettingsRepository.commitTransaction(session);

    return settings;
  }
}

module.exports = SettingsService;
