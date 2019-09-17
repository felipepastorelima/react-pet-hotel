const admin = require('../external/firebase-admin')();
const config = require('../../config')();
const _get = require('lodash/get');
const EmailAddressVerificationEmail = require('../emails/emailAddressVerificationEmail');
const PasswordResetEmail = require('../emails/passwordResetEmail');
const EmailSender = require('../services/shared/email/emailSender');
const ValidationError = require('../errors/validationError');

module.exports = class AuthService {
  static _resetForTests() {
    admin._reset();
  }

  static async _updateEmailForTests(uid, email) {
    await admin.auth().updateUser(uid, {
      email,
    });
  }

  static async init() {
    let serviceAccount = null;

    try {
      serviceAccount = require(`../../service-accounts/${
        config.env
      }.json`);
    } catch (error) {
      if (config.env === 'test') {
        return;
      }

      throw error;
    }

    await admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: `https://${
        serviceAccount.project_id
      }.firebaseio.com`,
    });
  }

  static async verifyIdToken(idToken) {
    return admin.auth().verifyIdToken(idToken);
  }

  static async createCustomToken(uid, metadata) {
    return admin.auth().createCustomToken(uid, metadata);
  }

  static async getUserByEmail(email) {
    return admin.auth().getUserByEmail(email);
  }

  static async getUser(uid) {
    return admin.auth().getUser(uid);
  }

  static async updateUser(uid, data) {
    await admin.auth().updateUser(uid, {
      displayName: data.fullName,
      photoURL:
        data.avatars && data.avatars.length
          ? data.avatars[0].publicUrl
          : null,
    });
  }

  static async disable(uid) {
    await admin.auth().updateUser(uid, {
      disabled: true,
    });
  }

  static async enable(uid) {
    await admin.auth().updateUser(uid, {
      disabled: false,
    });
  }

  static async sendEmailAddressVerificationEmail(
    language,
    email,
  ) {
    if (!EmailSender.isConfigured) {
      throw new Error(
        `Email provider is not configured. Please configure it at backend/config/<environment>/email.json.`,
      );
    }

    let link;
    try {
      link = await admin
        .auth()
        .generateEmailVerificationLink(
          email,
          this._actionCodeSettings,
        );
    } catch (error) {
      throw new ValidationError(
        language,
        'auth.emailAddressVerificationEmail.error',
      );
    }

    const emailAddressVerificationEmail = new EmailAddressVerificationEmail(
      language,
      email,
      link,
    );

    return new EmailSender(
      emailAddressVerificationEmail,
    ).send();
  }

  static async sendPasswordResetEmail(language, email) {
    if (!EmailSender.isConfigured) {
      throw new Error(
        `Email provider is not configured. Please configure it at backend/config/<environment>/email.json.`,
      );
    }

    let link;

    try {
      link = await admin
        .auth()
        .generatePasswordResetLink(
          email,
          this._actionCodeSettings,
        );
    } catch (error) {
      throw new ValidationError(
        language,
        'auth.passwordReset.error',
      );
    }

    const passwordResetEmail = new PasswordResetEmail(
      language,
      email,
      link,
    );

    return new EmailSender(passwordResetEmail).send();
  }

  static get _actionCodeSettings() {
    const url = _get(
      config,
      'clientUrl',
      undefined,
    );

    if (!url) {
      return undefined;
    }

    return {
      url,
    };
  }
};
