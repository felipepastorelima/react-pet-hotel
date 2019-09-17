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
    const transaction = await SettingsRepository.createTransaction();

    const settings = await SettingsRepository.save(data, {
      currentUser,
      transaction,
    });

    await SettingsRepository.commitTransaction(transaction);

    return settings;
  }
}

module.exports = SettingsService;
