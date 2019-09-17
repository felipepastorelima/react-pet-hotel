const schema = `
  type File {
    id: String
    name: String!
    sizeInBytes: Int
    privateUrl: String
    publicUrl: String!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
