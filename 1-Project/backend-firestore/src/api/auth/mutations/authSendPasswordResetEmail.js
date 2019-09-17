const AuthService = require('../../../auth/authService');

const schema = `
  authSendPasswordResetEmail(email: String!): Boolean
`;

const resolver = {
  authSendPasswordResetEmail: async (
    root,
    args,
    context,
  ) => {
    await AuthService.sendPasswordResetEmail(
      context.language,
      args.email,
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
