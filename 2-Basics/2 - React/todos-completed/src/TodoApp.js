import React from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  onSubmit = item => {
    this.setState(prevState => {
      return {
        items: prevState.items.concat(item)
      };
    });
  };

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <TodoForm items={this.state.items} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default TodoApp;
