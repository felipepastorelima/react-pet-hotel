const BookingService = require('../../../services/booking/bookingService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;

const schema = `
  bookingImport(data: BookingInput!, importHash: String!): Boolean
`;

const resolver = {
  bookingImport: async (root, args, context) => {
    new PermissionChecker(context).validateHas(
      permissions.bookingImport,
    );

    await new BookingService(context).import(
      args.data,
      args.importHash,
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
