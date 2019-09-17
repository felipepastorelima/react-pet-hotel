const BookingService = require('../../../services/booking/bookingService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bookingUpdate(id: String!, data: BookingInput!): Booking!
`;

const resolver = {
  bookingUpdate: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.bookingEdit,
    );

    return new BookingService(context).update(
      args.id,
      args.data,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
