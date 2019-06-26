import React from "react";
import todosSelectors from "../modules/todos/todosSelectors";
import { connect } from "react-redux";

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

const select = state => {
  return {
    items: todosSelectors.selectItems(state)
  };
};

export default connect(select)(TodoList);
