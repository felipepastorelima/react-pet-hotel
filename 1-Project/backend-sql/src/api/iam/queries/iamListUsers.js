const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const UserRepository = require('../../../database/repositories/userRepository');

const schema = `
  iamListUsers(filter: IamListUsersFilterInput, limit: Int, offset: Int, orderBy: UserWithRolesOrderByEnum): UserWithRolesPage!
`;

const resolver = {
  iamListUsers: async (root, args, context, info) => {
    new PermissionChecker(context).validateHas(
      permissions.iamRead,
    );

    return UserRepository.findAllWithCount(args);
  },
};

exports.schema = schema;
exports.resolver = resolver;
