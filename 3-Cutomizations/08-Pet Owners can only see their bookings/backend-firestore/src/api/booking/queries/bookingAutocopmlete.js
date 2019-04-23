const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const BookingService = require('../../../services/bookingService');

const schema = `
  bookingAutocomplete(query: String, owner: String, limit: Int): [AutocompleteOption!]!
`;

const resolver = {
  bookingAutocomplete: async (
    root,
    args,
    context,
    info,
  ) => {
    new PermissionChecker(context).validateHas(
      permissions.bookingAutocomplete,
    );

    const filter = {
      query: args.query,
      owner: args.owner,
    };

    return new BookingService(context).findAllAutocomplete(
      filter,
      args.limit,
    );
  },
};

exports.schema = schema;
exports.resolver = resolver;
