const schema = `
  input SettingsInput {
    theme: String!
    dailyFee: Float!
    capacity: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
