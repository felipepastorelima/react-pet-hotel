const schema = `
  input PetInput {
    owner: String!
    name: String!
    type: PetTypeEnum!
    breed: String!
    size: PetSizeEnum!
    bookings: [ String! ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
