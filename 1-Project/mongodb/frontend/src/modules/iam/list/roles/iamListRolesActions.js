import IamService from 'modules/iam/iamService';
import paginationAction from 'modules/shared/pagination/paginationAction';
import selectors from 'modules/iam/list/roles/iamListRolesSelectors';
import Errors from 'modules/shared/error/errors';
import Message from 'view/shared/message';
import groupBy from 'lodash/groupBy';
import { i18n } from 'i18n';

const prefix = 'IAM_LIST_ROLES';

const paginationActions = paginationAction(
  prefix,
  IamService.fetchRoles,
  selectors,
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
      const selectedChildren = selectors.selectSelectedChildren(
        getState(),
      );

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_STARTED,
      });

      await IamService.disable(
        selectedChildren.map(
          (selectedChild) => selectedChild.userId,
        ),
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
      const selectedChildren = selectors.selectSelectedChildren(
        getState(),
      );

      dispatch({
        type: actions.CHANGE_STATUS_SELECTED_STARTED,
      });

      await IamService.enable(
        selectedChildren.map(
          (selectedChild) => selectedChild.userId,
        ),
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
      const selectedChildren = selectors.selectSelectedChildren(
        getState(),
      );

      dispatch({
        type: actions.REMOVE_ALL_SELECTED_STARTED,
      });

      const group = groupBy(selectedChildren, 'role');

      for (const role of Object.keys(group)) {
        await IamService.remove(
          group[role].map((user) => user.email),
          [role],
        );
      }

      dispatch({
        type: actions.REMOVE_ALL_SELECTED_SUCCESS,
      });

      Message.success(
        i18n('iam.roles.doRemoveAllSelectedSuccess'),
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
