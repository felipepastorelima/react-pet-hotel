const SettingsService = require('../../../services/settingsService');

const schema = `
  settingsFind: Settings!
`;

const resolver = {
  settingsFind: async (root, args, context) => {
    return SettingsService.findOrCreateDefault(
      context.currentUser,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
