const GraphQLJSON = require('graphql-type-json');

const schema = `
  scalar JSON
`;

const resolver = {
  JSON: GraphQLJSON,
};

exports.schema = schema;
exports.resolver = resolver;
