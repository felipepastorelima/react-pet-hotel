const ForbiddenError = require('../../../errors/forbiddenError');
const StorageTokenGenerator = require('../../../storage/storageTokenGenerator');

const schema = `
  authStorageToken: String!
`;

const resolver = {
  authStorageToken(root, args, context) {
    if (!context.currentUser || !context.currentUser.id) {
      throw new ForbiddenError(context.language);
    }

    return new StorageTokenGenerator(
      context,
    ).generateStorageToken();
  },
};

exports.schema = schema;
exports.resolver = resolver;
