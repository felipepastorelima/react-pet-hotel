const bookingStatus = require('../../../enumerators/bookingStatus');

const schema = `
  enum BookingStatusEnum {
    ${bookingStatus.BOOKED}
    ${bookingStatus.PROGRESS}
    ${bookingStatus.CANCELLED}
    ${bookingStatus.COMPLETED}
  }
`;

const resolver = {};

exports.schema = schema;
exports.resolver = resolver;
