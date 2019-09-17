const schema = `
  type PetPage {
    rows: [Pet!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
