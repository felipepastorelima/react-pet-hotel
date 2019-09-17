const schema = `
  input FileInput {
    id: String
    name: String!
    sizeInBytes: Int
    privateUrl: String
    publicUrl: String!
    new: Boolean
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
