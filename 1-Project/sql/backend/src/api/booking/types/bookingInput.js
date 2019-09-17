const schema = `
  input BookingInput {
    owner: String!
    pet: String!
    arrival: DateTime!
    departure: DateTime!
    clientNotes: String
    employeeNotes: String
    photos: [ FileInput! ]
    status: BookingStatusEnum!
    cancellationNotes: String
    fee: Float
    receipt: [ FileInput! ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
