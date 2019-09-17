const BookingService = require('../../../services/bookingService');
const PermissionChecker = require('../../../services/iam/permissionChecker');
const permissions = require('../../../security/permissions')
  .values;
const graphqlSelectRequestedAttributes = require('../../shared/utils/graphqlSelectRequestedAttributes');

const schema = `
  bookingList(filter: BookingFilterInput, limit: Int, offset: Int, orderBy: BookingOrderByEnum): BookingPage!
`;

const resolver = {
  bookingList: async (root, args, context, info) => {
    new PermissionChecker(context)
      .validateHas(permissions.bookingRead);

    return new BookingService(context).findAndCountAll({
      ...args,
      requestedAttributes: graphqlSelectRequestedAttributes(
        info,
        'rows',
      ),
    });
  },
};

exports.schema = schema;
exports.resolver = resolver;
