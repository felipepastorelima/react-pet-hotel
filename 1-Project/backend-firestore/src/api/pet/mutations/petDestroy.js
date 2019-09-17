const PetService = require('../../../services/petService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  petDestroy(ids: [String!]!): Boolean
`;

const resolver = {
  petDestroy: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.petDestroy);

    await new PetService(context).destroyAll(
      args.ids
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
