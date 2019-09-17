import Errors from 'modules/shared/error/errors';
import IamService from 'modules/iam/iamService';
import { getHistory } from 'modules/store';
import selectors from 'modules/iam/view/iamViewSelectors';
import { i18n } from 'i18n';
import Message from 'view/shared/message';

const prefix = 'IAM_VIEW';

const actions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  CHANGE_STATUS_STARTED: `${prefix}_CHANGE_STATUS_STARTED`,
  CHANGE_STATUS_SUCCESS: `${prefix}_CHANGE_STATUS_SUCCESS`,
  CHANGE_STATUS_ERROR: `${prefix}_CHANGE_STATUS_ERROR`,

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

  doToggleStatus: () => async (dispatch, getState) => {
    try {
      const user = selectors.selectUser(getState());

      dispatch({
        type: actions.CHANGE_STATUS_STARTED,
      });

      const isEnabling = !!user.disabled;

      if (isEnabling) {
        await IamService.enable([user.id]);
      } else {
        await IamService.disable([user.id]);
      }

      dispatch({
        type: actions.CHANGE_STATUS_SUCCESS,
      });

      if (isEnabling) {
        Message.success(i18n('iam.doEnableSuccess'));
      } else {
        Message.success(i18n('iam.doDisableSuccess'));
      }

      dispatch(actions.doFind(user.id));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.CHANGE_STATUS_ERROR,
      });
    }
  },
};

export default actions;
