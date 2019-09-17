const BookingService = require('../../../services/bookingService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bookingFind(id: String!): Booking!
`;

const resolver = {
  bookingFind: async (root, args, context) => {
    new PermissionChecker(context)
      .validateHas(permissions.bookingRead);

    return new BookingService(context).findById(args.id);
  },
};

exports.schema = schema;
exports.resolver = resolver;
