import todosActions from "./todosActions";

const initialData = {
  items: []
};

export default (state = initialData, { type, payload }) => {
  if (type === todosActions.TODO_ADDED) {
    return {
      ...state,
      items: state.items.concat(payload)
    };
  }

  return state;
};
