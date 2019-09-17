const SettingsService = require('../../../services/settingsService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  settingsSave(settings: SettingsInput!): Boolean
`;

const resolver = {
  settingsSave: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.settingsEdit,
    );

    await SettingsService.save(args.settings, context.currentUser);

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
