const PetService = require('../../../services/petService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  petImport(data: PetInput!, importHash: String!): Boolean
`;

const resolver = {
  petImport: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.petImport);

    await new PetService(context).import(
      args.data,
      args.importHash
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
