const schema = `
  enum BookingOrderByEnum {
    id_ASC
    id_DESC
    arrival_ASC
    arrival_DESC
    departure_ASC
    departure_DESC
    status_ASC
    status_DESC
    fee_ASC
    fee_DESC
    createdAt_ASC
    createdAt_DESC
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
