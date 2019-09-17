import Message from 'view/shared/message';
import { getHistory } from 'modules/store';
import { i18n, i18nExists } from 'i18n';

const DEFAULT_ERROR_MESSAGE = i18n(
  'errors.defaultErrorMessage',
);

function isFirebaseAuthError(error) {
  return error.code && error.code.startsWith('auth');
}

function selectErrorMessage(error) {
  if (
    error &&
    error.graphQLErrors &&
    error.graphQLErrors.length &&
    error.graphQLErrors[0].message
  ) {
    return error.graphQLErrors[0].message;
  }

  if (
    error &&
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors &&
    error.networkError.result.errors.length &&
    error.networkError.result.errors[0].message
  ) {
    return error.networkError.result.errors[0].message;
  }

  if (isFirebaseAuthError(error)) {
    if (i18nExists(`firebaseErrors.${error.code}`)) {
      return i18n(`firebaseErrors.${error.code}`);
    }

    return DEFAULT_ERROR_MESSAGE;
  }

  return error.message || DEFAULT_ERROR_MESSAGE;
}

function selectErrorCode(error) {
  if (error && error.networkError) {
    if (
      error.networkError.result &&
      error.networkError.result.errors &&
      error.networkError.result.errors.length &&
      error.networkError.result.errors[0].code
    ) {
      return Number(
        error.networkError.result.errors[0].code,
      );
    }

    if (error.networkError.statusCode) {
      return Number(error.networkError.statusCode);
    }
  }

  if (
    error &&
    error.graphQLErrors &&
    error.graphQLErrors.length
  ) {
    return 400;
  }

  if (isFirebaseAuthError(error)) {
    return 400;
  }

  return 500;
}

export default class Errors {
  static handle(error) {
    if (process.env.NODE_ENV !== 'test') {
      console.error(selectErrorMessage(error));
      console.error(error);
    }

    if (selectErrorCode(error) === 403) {
      getHistory().push('/403');
      return;
    }

    if (selectErrorCode(error) === 400) {
      Message.error(selectErrorMessage(error));
      return;
    }

    getHistory().push('/500');
  }

  static errorCode(error) {
    return selectErrorCode(error);
  }

  static selectMessage(error) {
    return selectErrorMessage(error);
  }

  static showMessage(error) {
    Message.error(selectErrorMessage(error));
  }
}
