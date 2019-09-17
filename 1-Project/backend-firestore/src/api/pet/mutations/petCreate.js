const PetService = require('../../../services/petService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  petCreate(data: PetInput!): Pet!
`;

const resolver = {
  petCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.petCreate);

    return new PetService(context).create(
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
