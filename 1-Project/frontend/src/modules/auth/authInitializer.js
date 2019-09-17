import actions from 'modules/auth/authActions';
import service from 'modules/auth/authService';

export default (store) => {
  const unsubscribe = service.onAuthStateChanged(
    (authenticationUser) => {
      store.dispatch(
        actions.doSigninFromAuthChange(authenticationUser),
      );
      unsubscribe();
    },
    (error) => {
      store.dispatch({
        type: actions.AUTH_INIT_ERROR,
        payload: error,
      });
    },
  );
};
