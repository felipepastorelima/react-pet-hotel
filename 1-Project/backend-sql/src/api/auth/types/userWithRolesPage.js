const schema = `
  type UserWithRolesPage {
    rows: [UserWithRoles!]!,
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
