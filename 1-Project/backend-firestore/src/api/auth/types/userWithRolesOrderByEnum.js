const schema = `
  enum UserWithRolesOrderByEnum {
    email_ASC
    email_DESC
    fullName_ASC
    fullName_DESC
    disabled_ASC
    disabled_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
