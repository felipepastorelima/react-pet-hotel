const schema = `
  input PetFilterInput {
    id: String
    owner: String
    name: String
    type: PetTypeEnum
    breed: String
    size: PetSizeEnum
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
