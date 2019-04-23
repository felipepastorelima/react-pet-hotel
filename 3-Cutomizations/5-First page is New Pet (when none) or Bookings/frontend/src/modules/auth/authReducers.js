import actions from 'modules/auth/authActions';

const initialData = {
  authenticationUser: null,
  currentUser: null,
  loadingInit: true,
  loadingEmailConfirmation: false,
  loadingPasswordReset: false,
  loadingUpdateProfile: false,
  loading: false,
  errorMessage: null,
  redirectToNewPet: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.ERROR_MESSAGE_CLEARED) {
    return {
      ...state,
      errorMessage: null,
    };
  }

  if (type === actions.CURRENT_USER_REFRESH_SUCCESS) {
    return {
      ...state,
      currentUser: payload.currentUser || null,
    };
  }

  if (type === actions.AUTH_START) {
    return {
      ...state,
      errorMessage: null,
      loading: true,
    };
  }

  if (type === actions.AUTH_SUCCESS) {
    return {
      ...state,
      authenticationUser:
        payload.authenticationUser || null,
      currentUser: payload.currentUser || null,
      errorMessage: null,
      loading: false,
      redirectToNewPet: !!payload.redirectToNewPet,
    };
  }

  if (type === actions.AUTH_ERROR) {
    return {
      ...state,
      authenticationUser: null,
      currentUser: null,
      errorMessage: payload || null,
      loading: false,
      redirectToNewPet: false,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_START) {
    return {
      ...state,
      loadingEmailConfirmation: true,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_SUCCESS) {
    return {
      ...state,
      loadingEmailConfirmation: false,
    };
  }

  if (type === actions.EMAIL_CONFIRMATION_ERROR) {
    return {
      ...state,
      loadingEmailConfirmation: false,
    };
  }

  if (type === actions.PASSWORD_RESET_START) {
    return {
      ...state,
      loadingPasswordReset: true,
    };
  }

  if (type === actions.PASSWORD_RESET_SUCCESS) {
    return {
      ...state,
      loadingPasswordReset: false,
    };
  }

  if (type === actions.PASSWORD_RESET_ERROR) {
    return {
      ...state,
      loadingPasswordReset: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_START) {
    return {
      ...state,
      loadingUpdateProfile: true,
    };
  }

  if (type === actions.UPDATE_PROFILE_SUCCESS) {
    return {
      ...state,
      loadingUpdateProfile: false,
    };
  }

  if (type === actions.UPDATE_PROFILE_ERROR) {
    return {
      ...state,
      loadingUpdateProfile: false,
    };
  }

  if (type === actions.AUTH_INIT_SUCCESS) {
    return {
      ...state,
      authenticationUser:
        payload.authenticationUser || null,
      currentUser: payload.currentUser || null,
      loadingInit: false,
      redirectToNewPet: !!payload.redirectToNewPet,
    };
  }

  if (type === actions.AUTH_INIT_ERROR) {
    return {
      ...state,
      authenticationUser: null,
      currentUser: null,
      loadingInit: false,
      redirectToNewPet: false,
    };
  }

  return state;
};
