const schema = `
  input BookingFilterInput {
    id: String
    owner: String
    pet: String
    arrivalRange: [ DateTime ]
    departureRange: [ DateTime ]
    status: BookingStatusEnum
    feeRange: [ Float ]
    createdAtRange: [ DateTime ]
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
