import Errors from 'modules/shared/error/errors';
import { getHistory } from 'modules/store';
import SettingsService from 'modules/settings/settingsService';
import Message from 'view/shared/message';
import { i18n } from 'i18n';

const prefix = 'SETTINGS';

const actions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  SAVE_STARTED: `${prefix}_SAVE_STARTED`,
  SAVE_SUCCESS: `${prefix}_SAVE_SUCCESS`,
  SAVE_ERROR: `${prefix}_SAVE_ERROR`,

  doFind: () => async (dispatch) => {
    try {
      dispatch({
        type: actions.FIND_STARTED,
      });

      const settings = await SettingsService.find();

      dispatch({
        type: actions.FIND_SUCCESS,
        payload: settings,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.FIND_ERROR,
      });

      getHistory().push('/');
    }
  },

  doSave: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: actions.SAVE_STARTED,
      });

      await SettingsService.save(values);

      dispatch({
        type: actions.SAVE_SUCCESS,
      });

      const secondsForReload = 3;

      Message.success(
        i18n('settings.save.success', secondsForReload),
      );

      /**
       * Theme change happens at boot time.
       * So to take effect the page must be reloaded
       */
      setTimeout(
        () => window.location.reload(),
        secondsForReload * 1000,
      );
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.SAVE_ERROR,
      });
    }
  },
};

export default actions;
