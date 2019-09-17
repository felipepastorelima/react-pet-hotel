import Errors from 'modules/shared/error/errors';
import { i18n } from 'i18n';
import { getHistory } from 'modules/store';
import Message from 'view/shared/message';

export default ({
  prefix,
  destroyAllFn,
  destroySuccessMessageI18nKey,
  destroyAllSuccessMessageI18nKey,
  redirectTo,
  listActions
}) => {
  const actions = {
    DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
    DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
    DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

    DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
    DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
    DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

    doDestroy: (id) => async (dispatch) => {
      try {
        dispatch({
          type: actions.DESTROY_STARTED,
        });

        await destroyAllFn([id]);

        dispatch({
          type: actions.DESTROY_SUCCESS,
        });

        Message.success(i18n(destroySuccessMessageI18nKey));

        getHistory().push(redirectTo);
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: actions.DESTROY_ERROR,
        });
      }
    },

    doDestroyAll: (ids) => async (dispatch) => {
      try {
        dispatch({
          type: actions.DESTROY_ALL_STARTED,
        });

        await destroyAllFn(ids);

        dispatch({
          type: actions.DESTROY_ALL_SUCCESS,
        });

        if (listActions) {
          dispatch(listActions.doChangeSelected([]));
        }

        Message.success(
          i18n(destroyAllSuccessMessageI18nKey),
        );

        getHistory().push(redirectTo);
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: actions.DESTROY_ALL_ERROR,
        });
      }
    },
  };

  return actions;
};
