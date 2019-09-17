const schema = `
  input AuditLogListFilterInput {
    entityNames: [String!]
    entityId: String
    action: String
    timestampRange: [DateTime]
    createdByEmail: String
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
