import actions from 'modules/iam/view/iamViewActions';

const initialData = {
  loading: false,
  user: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.CHANGE_STATUS_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.CHANGE_STATUS_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      user: null,
      loading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      user: payload,
      loading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      user: null,
      loading: false,
    };
  }

  return state;
};
