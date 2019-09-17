import IamService from 'modules/iam/iamService';
import paginationAction from 'modules/shared/pagination/paginationAction';
import selectors from 'modules/iam/list/users/iamListUsersSelectors';
import Errors from 'modules/shared/error/errors';
import Message from 'view/shared/message';
import { i18n } from 'i18n';
import exporterFields from 'modules/iam/list/users/iamListUsersExporterFields';

const prefix = 'IAM_LIST_USERS';

const paginationActions = paginationAction(
  prefix,
  IamService.fetchUsers,
  selectors,
  i18n('iam.users.exporterFileName'),
  exporterFields,
);

const actions = {
  REMOVE_ALL_SELECTED_STARTED: `${prefix}_REMOVE_ALL_SELECTED_STARTED`,
  REMOVE_ALL_SELECTED_SUCCESS: `${prefix}_REMOVE_ALL_SELECTED_SUCCESS`,
  REMOVE_ALL_SELECTED_ERROR: `${prefix}_REMOVE_ALL_SELECTED_ERROR`,

  CHANGE_STATUS_SELECTED_STARTED: `${prefix}_CHANGE_STATUS_SELECTED_STARTED`,
  CHANGE_STATUS_SELECTED_SUCCESS: `${prefix}_CHANGE_STATUS_SELECTED_SUCCESS`,
  CHANGE_STATUS_SELECTED_ERROR: `${prefix}_CHANGE_STATUS_SELECTED_ERROR`,

  doDisableAllSelected: () => async (
    dispatch,
    getState,
  ) => {
    try {
      const selectedRows = selectors.selectSelectedRows(
        getState(),
      );

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_STARTED,
      });

      await IamService.disable(
        selectedRows.map((user) => user.id),
      );

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_SUCCESS,
      });

      Message.success(i18n('iam.doDisableAllSuccess'));

      const filter = selectors.selectFilter(getState());
      dispatch(paginationActions.doFetch(filter));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_ERROR,
      });

      const filter = selectors.selectFilter(getState());
      dispatch(paginationActions.doFetch(filter));
    }
  },

  doEnableAllSelected: () => async (dispatch, getState) => {
    try {
      const selectedRows = selectors.selectSelectedRows(
        getState(),
      );

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_STARTED,
      });

      await IamService.enable(
        selectedRows.map((user) => user.id),
      );

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_SUCCESS,
      });

      Message.success(i18n('iam.doEnableAllSuccess'));

      const filter = selectors.selectFilter(getState());
      dispatch(paginationActions.doFetch(filter));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_ERROR,
      });

      const filter = selectors.selectFilter(getState());
      dispatch(paginationActions.doFetch(filter));
    }
  },

  doRemoveAllSelected: () => async (dispatch, getState) => {
    try {
      const selectedRows = selectors.selectSelectedRows(
        getState(),
      );

      dispatch({
        type: actions.REMOVE_ALL_SELECTED_STARTED,
      });

      await IamService.remove(
        selectedRows.map((row) => row.email),
        [],
        true,
      );

      dispatch({
        type: actions.REMOVE_ALL_SELECTED_SUCCESS,
      });

      Message.success(
        i18n('iam.users.doRemoveAllSelectedSuccess'),
      );

      const filter = selectors.selectFilter(getState());
      dispatch(paginationActions.doFetch(filter));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: actions.REMOVE_ALL_SELECTED_ERROR,
      });

      const filter = selectors.selectFilter(getState());
      dispatch(paginationActions.doFetch(filter));
    }
  },
};

export default {
  ...paginationActions,
  ...actions,
};
