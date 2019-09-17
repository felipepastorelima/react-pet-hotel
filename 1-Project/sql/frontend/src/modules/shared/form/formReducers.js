export default (actions) => {
  const initialData = {
    findLoading: false,
    saveLoading: false,
    record: null,
  };

  return (state = initialData, { type, payload }) => {
    if (type === actions.RESET) {
      return {
        ...initialData,
      };
    }

    if (type === actions.FIND_STARTED) {
      return {
        ...state,
        record: null,
        findLoading: true,
      };
    }

    if (type === actions.FIND_SUCCESS) {
      return {
        ...state,
        record: payload,
        findLoading: false,
      };
    }

    if (type === actions.FIND_ERROR) {
      return {
        ...state,
        record: null,
        findLoading: false,
      };
    }

    if (type === actions.CREATE_STARTED) {
      return {
        ...state,
        saveLoading: true,
      };
    }

    if (type === actions.CREATE_SUCCESS) {
      return {
        ...state,
        saveLoading: false,
      };
    }

    if (type === actions.CREATE_ERROR) {
      return {
        ...state,
        saveLoading: false,
      };
    }

    if (type === actions.UPDATE_STARTED) {
      return {
        ...state,
        saveLoading: true,
      };
    }

    if (type === actions.UPDATE_SUCCESS) {
      return {
        ...state,
        saveLoading: false,
      };
    }

    if (type === actions.UPDATE_ERROR) {
      return {
        ...state,
        saveLoading: false,
      };
    }

    return state;
  };
};
