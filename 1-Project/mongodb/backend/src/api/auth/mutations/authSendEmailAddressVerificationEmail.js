const AuthService = require('../../../auth/authService');
const ForbiddenError = require('../../../errors/forbiddenError');

const schema = `
  authSendEmailAddressVerificationEmail: Boolean
`;

const resolver = {
  authSendEmailAddressVerificationEmail: async (
    root,
    args,
    context,
  ) => {
    if (!context.currentUser) {
      throw new ForbiddenError(context.language);
    }

    await AuthService.sendEmailAddressVerificationEmail(
      context.language,
      context.currentUser.email,
    );

    return true;
  },
};

exports.schema = schema;
exports.resolver = resolver;
