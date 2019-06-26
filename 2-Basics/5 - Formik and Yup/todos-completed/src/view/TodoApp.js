import React from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

class TodoApp extends React.Component {
  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList />
        <TodoForm />
      </div>
    );
  }
}

export default TodoApp;
