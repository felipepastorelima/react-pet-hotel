const { i18n } = require('../i18n');

module.exports = class PasswordResetEmail {
  constructor(language, to, link) {
    this.language = language;
    this.to = to;
    this.link = link;
  }

  get subject() {
    return i18n(
      this.language,
      'emails.passwordReset.subject',
      i18n(this.language, 'app.title'),
    );
  }

  get html() {
    return i18n(
      this.language,
      'emails.passwordReset.body',
      i18n(this.language, 'app.title'),
      this.to,
      this.link,
    );
  }
};
