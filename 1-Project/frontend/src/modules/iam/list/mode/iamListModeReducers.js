import actions from 'modules/iam/list/mode/iamListModeActions';

const initialData = 'users';

export default (state = initialData, { type, payload }) => {
  if (type === actions.CHANGED) {
    return payload;
  }

  return state;
};
