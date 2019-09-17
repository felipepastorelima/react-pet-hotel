const BookingService = require('../../../services/bookingService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bookingCreate(data: BookingInput!): Booking!
`;

const resolver = {
  bookingCreate: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.bookingCreate);

    return new BookingService(context).create(
      args.data
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
