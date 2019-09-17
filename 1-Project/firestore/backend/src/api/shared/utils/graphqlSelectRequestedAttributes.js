const graphqlFields = require('graphql-fields');
const lodash = require('lodash');

module.exports = function graphqlSelectRequestedAttributes(
  info,
  depth,
) {
  const root = graphqlFields(info);
  let obj = depth ? lodash.get(root, depth) : root;
  return Object.keys(obj);
};
