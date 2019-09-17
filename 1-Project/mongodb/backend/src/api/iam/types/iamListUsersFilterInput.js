const schema = `
  input IamListUsersFilterInput {
    id: String
    fullName: String
    email: String
    role: String
    status: String
    createdAtRange: [DateTime]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
