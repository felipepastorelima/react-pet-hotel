const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const PetService = require('../../../services/petService');

const schema = `
  petAutocomplete(query: String, owner: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  petAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context).validateHas(
      permissions.petAutocomplete,
    );

    const filter = {
      query: args.query,
      owner: args.owner,
    };

    return new PetService(context).findAllAutocomplete(
      filter,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
