const schema = `
  type BookingPage {
    rows: [Booking!]!
    count: Int!
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
