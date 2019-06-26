const todosActions = {
  TODO_ADDED: `TODO_ADDED`,

  doAddTodo: todo => {
    return {
      type: todosActions.TODO_ADDED,
      payload: todo
    };
  }
};

export default todosActions;
