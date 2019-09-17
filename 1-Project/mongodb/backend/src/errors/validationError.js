const { i18n, i18nExists } = require('..//i18n');

module.exports = class ValidationError extends Error {
  constructor(language, messageCode) {
    let message;

    if (messageCode && i18nExists(language, messageCode)) {
      message = i18n(language, messageCode);
    }

    message =
      message ||
      i18n(language, 'errors.validation.message');

    super(message);
    this.code = 400;
  }
};
