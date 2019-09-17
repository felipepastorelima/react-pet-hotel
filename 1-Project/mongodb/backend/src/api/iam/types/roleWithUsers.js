const UserRepository = require('../../../database/repositories/userRepository');

const schema = `
  type RoleWithUsers {
    role: String!    
    users: [User!]!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
