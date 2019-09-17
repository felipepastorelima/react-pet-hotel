const IamEditor = require('../../../services/iam/iamEditor');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  iamEdit(data: IamEditInput!): Boolean
`;

const resolver = {
  iamEdit: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.iamEdit,
    );

    let editor = new IamEditor(
      context.currentUser,
      context.language,
    );

    await editor.update(args.data);

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
