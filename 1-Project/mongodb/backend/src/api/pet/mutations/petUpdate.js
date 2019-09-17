const PetService = require('../../../services/petService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  petUpdate(id: String!, data: PetInput!): Pet!
`;

const resolver = {
  petUpdate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.petEdit);

    return new PetService(context).update(
      args.id,
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
