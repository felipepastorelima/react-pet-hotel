import actions from 'modules/iam/list/users/iamListUsersActions';
import paginationReducer from 'modules/shared/pagination/paginationReducer';

const additionalInitialData = {};

const additionalTypeCheckers = (state, { type }) => {
  if (type === actions.REMOVE_ALL_SELECTED_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.REMOVE_ALL_SELECTED_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.REMOVE_ALL_SELECTED_SUCCESS) {
    return {
      ...state,
      selectedKeys: [],
    };
  }

  if (type === actions.CHANGE_STATUS_SELECTED_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.CHANGE_STATUS_SELECTED_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.CHANGE_STATUS_SELECTED_SUCCESS) {
    return {
      ...state,
      selectedKeys: [],
    };
  }

  return state;
};

export default paginationReducer(
  actions,
  additionalInitialData,
  additionalTypeCheckers,
);
