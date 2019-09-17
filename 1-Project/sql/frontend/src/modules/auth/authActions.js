import selectors from 'modules/auth/authSelectors';
import service from 'modules/auth/authService';
import Errors from 'modules/shared/error/errors';
import Message from 'view/shared/message';
import { i18n } from 'i18n';
import { getHistory } from 'modules/store';

const prefix = 'AUTH';

const actions = {
  ERROR_MESSAGE_CLEARED: `${prefix}_ERROR_MESSAGE_CLEARED`,

  AUTH_INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  AUTH_INIT_ERROR: `${prefix}_INIT_ERROR`,

  AUTH_START: `${prefix}_START`,
  AUTH_SUCCESS: `${prefix}_SUCCESS`,
  AUTH_ERROR: `${prefix}_ERROR`,

  UPDATE_PROFILE_START: `${prefix}_UPDATE_PROFILE_START`,
  UPDATE_PROFILE_SUCCESS: `${prefix}_UPDATE_PROFILE_SUCCESS`,
  UPDATE_PROFILE_ERROR: `${prefix}_UPDATE_PROFILE_ERROR`,

  CURRENT_USER_REFRESH_START: `${prefix}_CURRENT_USER_REFRESH_START`,
  CURRENT_USER_REFRESH_SUCCESS: `${prefix}_CURRENT_USER_REFRESH_SUCCESS`,
  CURRENT_USER_REFRESH_ERROR: `${prefix}_CURRENT_USER_REFRESH_ERROR`,

  PASSWORD_RESET_START: `${prefix}_PASSWORD_RESET_START`,
  PASSWORD_RESET_SUCCESS: `${prefix}_PASSWORD_RESET_SUCCESS`,
  PASSWORD_RESET_ERROR: `${prefix}_PASSWORD_RESET_ERROR`,

  EMAIL_CONFIRMATION_START: `${prefix}_EMAIL_CONFIRMATION_START`,
  EMAIL_CONFIRMATION_SUCCESS: `${prefix}_EMAIL_CONFIRMATION_SUCCESS`,
  EMAIL_CONFIRMATION_ERROR: `${prefix}_EMAIL_CONFIRMATION_ERROR`,

  doClearErrorMessage() {
    return {
      type: actions.ERROR_MESSAGE_CLEARED,
    };
  },

  doSendEmailConfirmation: () => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({ type: actions.EMAIL_CONFIRMATION_START });
      await service.sendEmailVerification(
        selectors.selectAuthenticationUser(getState()),
      );
      Message.success(
        i18n('auth.verificationEmailSuccess'),
      );
      dispatch({
        type: actions.EMAIL_CONFIRMATION_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({ type: actions.EMAIL_CONFIRMATION_ERROR });
    }
  },

  doSendPasswordResetEmail: (email) => async (dispatch) => {
    try {
      dispatch({ type: actions.PASSWORD_RESET_START });
      await service.sendPasswordResetEmail(email);
      Message.success(i18n('auth.passwordResetSuccess'));
      dispatch({ type: actions.PASSWORD_RESET_SUCCESS });
    } catch (error) {
      Errors.handle(error);
      dispatch({ type: actions.PASSWORD_RESET_ERROR });
    }
  },

  doSigninSocial: (provider, rememberMe) => async (
    dispatch,
  ) => {
    try {
      dispatch({ type: actions.AUTH_START });

      let authenticationUser = null;
      let currentUser = null;

      const credentials = await service.signinWithSocial(
        provider,
        rememberMe,
      );

      if (credentials && credentials.user) {
        authenticationUser = credentials.user;
        currentUser = await service.fetchMe();
        currentUser.emailVerified =
          authenticationUser.emailVerified;
      }

      // in background
      service.reauthenticateWithStorageToken();

      dispatch({
        type: actions.AUTH_SUCCESS,
        payload: {
          currentUser,
          authenticationUser,
        },
      });
    } catch (error) {
      await service.signout();
      Errors.handle(error);

      dispatch({
        type: actions.AUTH_ERROR,
      });
    }
  },

  doRegisterEmailAndPassword: (email, password) => async (
    dispatch,
  ) => {
    try {
      dispatch({ type: actions.AUTH_START });

      const authenticationUser = await service.registerWithEmailAndPassword(
        email,
        password,
      );
      const currentUser = await service.fetchMe();
      currentUser.emailVerified =
        authenticationUser.emailVerified;

      // in background
      service.reauthenticateWithStorageToken();

      dispatch({
        type: actions.AUTH_SUCCESS,
        payload: {
          currentUser,
          authenticationUser,
        },
      });
    } catch (error) {
      await service.signout();

      if (Errors.errorCode(error) !== 400) {
        Errors.handle(error);
      }

      dispatch({
        type: actions.AUTH_ERROR,
        payload: Errors.selectMessage(error),
      });
    }
  },

  doSigninWithEmailAndPassword: (
    email,
    password,
    rememberMe,
  ) => async (dispatch) => {
    try {
      dispatch({ type: actions.AUTH_START });

      let authenticationUser = null;
      let currentUser = null;

      const credentials = await service.signinWithEmailAndPassword(
        email,
        password,
        rememberMe,
      );

      if (credentials && credentials.user) {
        authenticationUser = credentials.user;
        currentUser = await service.fetchMe();
        currentUser.emailVerified =
          authenticationUser.emailVerified;
      }

      // in background
      service.reauthenticateWithStorageToken();

      dispatch({
        type: actions.AUTH_SUCCESS,
        payload: {
          currentUser,
          authenticationUser,
        },
      });
    } catch (error) {
      await service.signout();

      if (Errors.errorCode(error) !== 400) {
        Errors.handle(error);
      }

      dispatch({
        type: actions.AUTH_ERROR,
        payload: Errors.selectMessage(error),
      });
    }
  },

  doSignout: () => async (dispatch) => {
    try {
      dispatch({ type: actions.AUTH_START });
      await service.signout();

      dispatch({
        type: actions.AUTH_SUCCESS,
        payload: {
          authenticationUser: null,
          currentUser: null,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.AUTH_ERROR,
      });
    }
  },

  doSigninFromAuthChange: (authenticationUser) => async (
    dispatch,
  ) => {
    try {
      let currentUser = null;

      if (authenticationUser) {
        currentUser = await service.fetchMe();

        // in background
        service.reauthenticateWithStorageToken();

        currentUser.emailVerified =
          authenticationUser.emailVerified;
      }

      dispatch({
        type: actions.AUTH_INIT_SUCCESS,
        payload: {
          currentUser,
          authenticationUser: authenticationUser,
        },
      });
    } catch (error) {
      service.signout();
      Errors.handle(error);

      dispatch({
        type: actions.AUTH_INIT_ERROR,
        payload: error,
      });
    }
  },

  doRefreshCurrentUser: () => async (
    dispatch,
    getState,
  ) => {
    try {
      dispatch({
        type: actions.CURRENT_USER_REFRESH_START,
      });

      const authenticationUser = selectors.selectAuthenticationUser(
        getState(),
      );
      const currentUser = await service.fetchMe();
      currentUser.emailVerified =
        authenticationUser.emailVerified;

      // in background
      service.reauthenticateWithStorageToken();

      dispatch({
        type: actions.CURRENT_USER_REFRESH_SUCCESS,
        payload: {
          currentUser,
        },
      });
    } catch (error) {
      service.signout();
      Errors.handle(error);

      dispatch({
        type: actions.CURRENT_USER_REFRESH_ERROR,
        payload: error,
      });
    }
  },

  doUpdateProfile: (
    firstName,
    lastName,
    phoneNumber,
    avatars,
  ) => async (dispatch) => {
    try {
      dispatch({
        type: actions.UPDATE_PROFILE_START,
      });

      await service.updateProfile(
        firstName,
        lastName,
        phoneNumber,
        avatars,
      );

      dispatch({
        type: actions.UPDATE_PROFILE_SUCCESS,
      });
      dispatch(actions.doRefreshCurrentUser());
      Message.success(i18n('auth.profile.success'));
      getHistory().push('/');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.UPDATE_PROFILE_ERROR,
      });
    }
  },
};

export default actions;
