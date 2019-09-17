const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const BookingService = require('../../../services/bookingService');

const schema = `
  bookingAutocomplete(query: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  bookingAutocomplete: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.bookingAutocomplete);

    return new BookingService(context).findAllAutocomplete(
      args.query,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
