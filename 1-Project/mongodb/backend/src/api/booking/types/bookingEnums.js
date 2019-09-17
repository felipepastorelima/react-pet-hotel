const schema = `
  enum BookingStatusEnum {
    booked
    progress
    cancelled
    completed
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
