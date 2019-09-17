const { i18n } = require('../i18n');

module.exports = class EmailAddressVerificationEmail {
  constructor(language, to, link) {
    this.language = language;
    this.to = to;
    this.link = link;
  }

  get subject() {
    return i18n(
      this.language,
      'emails.emailAddressVerification.subject',
      i18n(this.language, 'app.title'),
    );
  }

  get html() {
    return i18n(
      this.language,
      'emails.emailAddressVerification.body',
      this.link,
      i18n(this.language, 'app.title'),
    );
  }
};
