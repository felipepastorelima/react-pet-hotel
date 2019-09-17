const PermissionChecker = require('../../../services/iam/permissionChecker');
const AuditLogRepository = require('../../../database/repositories/auditLogRepository');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  auditLogList(filter: AuditLogListFilterInput, limit: Int, offset: Int, orderBy: AuditLogListOrderByEnum): AuditLogPage!
`;

const resolver = {
  auditLogList: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.auditLogRead);

    return AuditLogRepository.findAndCountAll(args);
  },
};

exports.schema = schema;
exports.resolver = resolver;
