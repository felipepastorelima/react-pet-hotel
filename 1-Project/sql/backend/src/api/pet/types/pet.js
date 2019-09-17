const schema = `
  type Pet {
    id: String!
    owner: User
    name: String
    type: PetTypeEnum
    breed: String
    size: PetSizeEnum
    bookings: [ Booking! ]
    createdAt: DateTime
    updatedAt: DateTime
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
