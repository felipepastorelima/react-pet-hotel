const { GraphQLDateTime } = require('graphql-iso-date');

const schema = `
  scalar DateTime
`;

const resolver = {
  DateTime: GraphQLDateTime,
};

exports.schema = schema;
exports.resolver = resolver;
