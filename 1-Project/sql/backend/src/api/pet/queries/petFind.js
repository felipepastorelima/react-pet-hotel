const PetService = require('../../../services/petService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  petFind(id: String!): Pet!
`;

const resolver = {
  petFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.petRead);

    return new PetService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
