import actions from 'modules/settings/settingsActions';

const initialData = {
  findLoading: false,
  saveLoading: false,
  settings: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      settings: null,
      findLoading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      settings: payload,
      findLoading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      settings: null,
      findLoading: false,
    };
  }

  if (type === actions.SAVE_STARTED) {
    return {
      ...state,
      saveLoading: true,
    };
  }

  if (type === actions.SAVE_SUCCESS) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  if (type === actions.SAVE_ERROR) {
    return {
      ...state,
      saveLoading: false,
    };
  }

  return state;
};
