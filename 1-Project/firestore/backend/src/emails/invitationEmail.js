const config = require('../../config')();
const { i18n } = require('../i18n');

module.exports = class InvitationEmail {
  constructor(language, to) {
    this.language = language;
    this.to = to;
  }

  get subject() {
    return i18n(
      this.language,
      'emails.invitation.subject',
      i18n(this.language, 'app.title'),
    );
  }

  get html() {
    return i18n(
      this.language,
      'emails.invitation.body',
      i18n(this.language, 'app.title'),
      `${config.clientUrl}/auth/signup?email=${
        this.to
      }`,
    );
  }
};
