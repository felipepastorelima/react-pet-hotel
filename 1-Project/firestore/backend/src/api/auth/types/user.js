const schema = `
  type User {
    id: String!
    fullName: String
    firstName: String
    lastName: String
    phoneNumber: String
    email: String!
    avatars: [File!]
    authenticationUid: String
    disabled: Boolean
    createdAt: DateTime
    updatedAt: DateTime    
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
