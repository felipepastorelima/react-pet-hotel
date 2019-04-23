const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const BookingService = require('../../../services/bookingService');

const schema = `
  bookingPeriodAvailable(arrival: DateTime!, departure: DateTime!, idToExclude: String): Boolean!
`;

const resolver = {
  bookingPeriodAvailable: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.bookingRead,
    );

    return new BookingService(context).isPeriodAvailable(
      args.arrival,
      args.departure,
      args.idToExclude,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
