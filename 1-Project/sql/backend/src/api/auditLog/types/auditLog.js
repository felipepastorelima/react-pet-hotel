const schema = `
  type AuditLog {
    id: String!
    entityName: String!
    entityId: String!
    action: String!
    timestamp: DateTime!
    createdBy: String
    createdByEmail: String
    values: JSON
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
