import Roles from 'security/roles';

const CURRENT_USER = {
  id: 1,
  fullName: 'John',
  email: 'john@test.test',
  roles: [Roles.values.owner],
};

const CREDENTIALS = {
  user: {
    uid: 1,
    displayName: 'John',
    email: 'john@test.test',
    emailVerified: true,
  },
};

export default {
  __hasError: false,

  __setError(value) {
    this.__hasError = !!value;
  },

  __errorInterceptor(successValue) {
    if (!this.__hasError) {
      return Promise.resolve(successValue);
    }

    return Promise.reject(new Error());
  },

  onAuthStateChanged(callbackSuccess, callbackError) {
    return () => {};
  },

  sendEmailVerification(authenticationUser) {
    return this.__errorInterceptor();
  },

  sendPasswordResetEmail(email) {
    return this.__errorInterceptor();
  },

  signinWithSocial(provider) {
    return this.__errorInterceptor(CREDENTIALS);
  },

  registerWithEmailAndPassword(email, password) {
    return this.__errorInterceptor(CURRENT_USER);
  },

  signinWithEmailAndPassword(email, password) {
    return this.__errorInterceptor(CREDENTIALS);
  },

  reauthenticateWithStorageToken() {
    return Promise.resolve();
  },

  signout() {
    return {};
  },

  fetchMe() {
    return this.__errorInterceptor(CURRENT_USER);
  },
};
