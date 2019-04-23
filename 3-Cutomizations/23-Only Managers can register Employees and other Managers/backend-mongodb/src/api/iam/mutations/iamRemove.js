const IamRemover = require('../../../services/iam/iamRemover');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  iamRemove(emails: [ String! ]!, roles: [ String! ]!, all: Boolean): Boolean
`;

const resolver = {
  iamRemove: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.iamRemove,
    );

    let remover = new IamRemover(
      context.currentUser,
      context.language,
    );

    await remover.removeAll(args);

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
