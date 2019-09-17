const schema = `
  type AuditLogPage {
    rows: [AuditLog!]!,
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
