const schema = `
  type Settings {
    theme: String!
    dailyFee: Float
    capacity: Int
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
