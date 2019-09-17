const prefix = 'IAM_LIST_MODE';

const actions = {
  CHANGED: `${prefix}_CHANGED`,

  doChangeIamListMode: (mode) => {
    return {
      type: actions.CHANGED,
      payload: mode,
    };
  },
};

export default actions;
