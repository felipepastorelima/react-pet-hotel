const AuthProfileEditor = require('../../../services/auth/authProfileEditor');
const ForbiddenError = require('../../../errors/forbiddenError');

const schema = `
  authUpdateProfile(profile: UserProfileInput!): Boolean
`;

const resolver = {
  authUpdateProfile: async (root, args, context) => {
    if (!context.currentUser || !context.currentUser.id) {
      throw new ForbiddenError(context.language);
    }

    let editor = new AuthProfileEditor(
      context.currentUser,
      context.language,
    );

    await editor.execute(args.profile);

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
