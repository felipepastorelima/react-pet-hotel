import Errors from 'modules/shared/error/errors';
import Message from 'view/shared/message';
import IamService from 'modules/iam/iamService';
import { getHistory } from 'modules/store';
import { i18n } from 'i18n';
import authSelectors from 'modules/auth/authSelectors';
import authActions from 'modules/auth/authActions';

const prefix = 'IAM_FORM';

const actions = {
  RESET: `${prefix}_RESET`,

  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  ADD_STARTED: `${prefix}_ADD_STARTED`,
  ADD_SUCCESS: `${prefix}_ADD_SUCCESS`,
  ADD_ERROR: `${prefix}_ADD_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doNew: () => {
    return {
      type: actions.RESET,
    };
  },

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: actions.FIND_STARTED,
      });

      const user = await IamService.find(id);

      dispatch({
        type: actions.FIND_SUCCESS,
        payload: user,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.FIND_ERROR,
      });

      getHistory().push('/iam');
    }
  },

  doAdd: (values) => async (dispatch) => {
    try {
      dispatch({
        type: actions.ADD_STARTED,
      });

      await IamService.create(values);

      dispatch({
        type: actions.ADD_SUCCESS,
      });

      Message.success(i18n('iam.doAddSuccess'));

      getHistory().push('/iam');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.ADD_ERROR,
      });
    }
  },

  doUpdate: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actions.UPDATE_STARTED,
      });

      await IamService.edit(values);

      dispatch({
        type: actions.UPDATE_SUCCESS,
      });

      const currentUser = authSelectors.selectCurrentUser(
        getState(),
      );

      if (currentUser.id === values.id) {
        dispatch(authActions.doRefreshCurrentUser());
      }

      Message.success(i18n('iam.doUpdateSuccess'));

      getHistory().push('/iam');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.UPDATE_ERROR,
      });
    }
  },
};

export default actions;
