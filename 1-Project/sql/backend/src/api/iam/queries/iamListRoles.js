const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const UserRoleRepository = require('../../../database/repositories/userRoleRepository');

const schema = `
  iamListRoles(filter: IamListRolesFilterInput, orderBy: RoleWithUsersOrderByEnum): [RoleWithUsers!]!
`;

const resolver = {
  iamListRoles: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.iamRead,
    );

    return UserRoleRepository.findAllWithUsers(args);
  },
};

exports.schema = schema;
exports.resolver = resolver;
