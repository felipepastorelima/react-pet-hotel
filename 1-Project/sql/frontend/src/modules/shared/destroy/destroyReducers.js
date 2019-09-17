export default (actions) => {
  const initialData = {
    loading: false,
  };

  return (state = initialData, { type, payload }) => {
    if (type === actions.DESTROY_ALL_STARTED) {
      return {
        ...state,
        loading: true,
      };
    }

    if (type === actions.DESTROY_ALL_SUCCESS) {
      return {
        ...state,
        loading: false,
      };
    }

    if (type === actions.DESTROY_ALL_ERROR) {
      return {
        ...state,
        loading: false,
      };
    }

    if (type === actions.DESTROY_STARTED) {
      return {
        ...state,
        loading: true,
      };
    }

    if (type === actions.DESTROY_SUCCESS) {
      return {
        ...state,
        loading: false,
      };
    }

    if (type === actions.DESTROY_ERROR) {
      return {
        ...state,
        loading: false,
      };
    }

    return state;
  };
};
