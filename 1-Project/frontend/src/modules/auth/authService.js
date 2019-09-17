import * as firebase from 'firebase/app';
import gql from 'graphql-tag';
import graphqlClient from 'modules/shared/graphql/graphqlClient';

export default class AuthService {
  static onAuthStateChanged(
    callbackSuccess,
    callbackError,
  ) {
    return firebase
      .auth()
      .onAuthStateChanged(callbackSuccess, callbackError);
  }

  static async sendEmailVerification(authenticationUser) {
    if (await this.isEmailConfigured()) {
      return this.sendEmailVerificationFromBackend();
    }

    return this.sendEmailVerificationFromClient(
      authenticationUser,
    );
  }

  static async sendEmailVerificationFromBackend() {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation AUTH_SEND_EMAIL_ADDRESS_VERIFICATION_EMAIL {
          authSendEmailAddressVerificationEmail
        }
      `,
    });

    return response.data
      .authSendEmailAddressVerificationEmail;
  }

  static async sendEmailVerificationFromClient(
    authenticationUser,
  ) {
    return authenticationUser.sendEmailVerification();
  }

  static async sendPasswordResetEmail(email) {
    if (await this.isEmailConfigured()) {
      return this.sendPasswordResetEmailFromBackend(email);
    }

    return this.sendPasswordResetEmailFromClient(email);
  }

  static async sendPasswordResetEmailFromBackend(email) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation AUTH_SEND_PASSWORD_RESET_EMAIL(
          $email: String!
        ) {
          authSendPasswordResetEmail(email: $email)
        }
      `,
      variables: {
        email,
      },
    });

    return response.data.authSendPasswordResetEmail;
  }

  static async sendPasswordResetEmailFromClient(email) {
    return firebase.auth().sendPasswordResetEmail(email);
  }

  static async registerWithEmailAndPassword(
    email,
    password,
  ) {
    const credentials = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    this.sendEmailVerification(credentials.user);
    return credentials.user;
  }

  static async signinWithSocial(
    provider,
    rememberMe = false,
  ) {
    const persistence = rememberMe
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;

    await firebase.auth().setPersistence(persistence);

    const providers = {
      google: firebase.auth.GoogleAuthProvider,
      facebook: firebase.auth.FacebookAuthProvider,
      twitter: firebase.auth.TwitterAuthProvider,
    };

    return firebase
      .auth()
      .signInWithPopup(new providers[provider]());
  }

  static async signinWithEmailAndPassword(
    email,
    password,
    rememberMe = false,
  ) {
    const persistence = rememberMe
      ? firebase.auth.Auth.Persistence.LOCAL
      : firebase.auth.Auth.Persistence.SESSION;

    await firebase.auth().setPersistence(persistence);

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
  }

  static async fetchMe() {
    const response = await graphqlClient.query({
      query: gql`
        {
          authMe {
            id
            authenticationUid
            fullName
            firstName
            lastName
            phoneNumber
            email
            roles
            avatars {
              id
              name
              publicUrl
            }
          }
        }
      `,
    });

    return response.data.authMe;
  }

  static async isEmailConfigured() {
    const response = await graphqlClient.query({
      query: gql`
        {
          authIsEmailConfigured
        }
      `,
    });

    return response.data.authIsEmailConfigured;
  }

  static async reauthenticateWithStorageToken() {
    try {
      const response = await graphqlClient.query({
        query: gql`
          {
            authStorageToken
          }
        `,
      });

      const token = response.data.authStorageToken;
      return firebase.auth().signInWithCustomToken(token);
    } catch (error) {
      console.error(error);
    }
  }

  static signout() {
    return firebase.auth().signOut();
  }

  static async updateProfile(
    firstName,
    lastName,
    phoneNumber,
    avatars,
  ) {
    const response = await graphqlClient.mutate({
      mutation: gql`
        mutation AUTH_UPDATE_PROFILE(
          $profile: UserProfileInput!
        ) {
          authUpdateProfile(profile: $profile)
        }
      `,

      variables: {
        profile: {
          firstName,
          lastName,
          phoneNumber,
          avatars,
        },
      },
    });

    return response.data.authUpdateProfile;
  }
}
