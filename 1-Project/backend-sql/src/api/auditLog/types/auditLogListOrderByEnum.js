const schema = `
  enum AuditLogListOrderByEnum {
    createdByEmail_ASC
    createdByEmail_DESC
    entityName_ASC
    entityName_DESC
    entityId_ASC
    entityId_DESC
    action_ASC
    action_DESC
    timestamp_ASC
    timestamp_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
