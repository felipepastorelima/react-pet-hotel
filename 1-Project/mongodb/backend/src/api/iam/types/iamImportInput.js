const schema = `
  input IamImportInput {
    email: String!
    firstName: String
    lastName: String
    phoneNumber: String
    avatars: [FileInput!]
    roles: [ String! ]!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
