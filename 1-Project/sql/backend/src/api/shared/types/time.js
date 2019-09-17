const { GraphQLTime } = require('graphql-iso-date');

const schema = `
  scalar Time
`;

const resolver = {
  Time: GraphQLTime,
};

exports.schema = schema;
exports.resolver = resolver;
