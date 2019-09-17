const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const UserRepository = require('../../../database/repositories/userRepository');

const schema = `
  iamUserAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  iamUserAutocomplete: async (
    root,
    args,
    context,
    info,
  ) => {
    new PermissionChecker(context).validateHas(
      permissions.iamUserAutocomplete,
    );

    return UserRepository.findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
