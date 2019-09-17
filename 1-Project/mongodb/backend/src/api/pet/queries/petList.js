const PetService = require('../../../services/petService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  petList(filter: PetFilterInput, limit: Int, offset: Int, orderBy: PetOrderByEnum): PetPage!
`;

const resolver = {
  petList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.petRead);

    return new PetService(context).findAndCountAll({
      ...args,
      requestedAttributes: graphqlSelectRequestedAttributes(
        info,
        'rows',
      ),
    });
  },
};

exports.schema = schema;
exports.resolver = resolver;
