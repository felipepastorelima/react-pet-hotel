import React from "react";
import ReactDOM from "react-dom";
import TodoApp from "./view/TodoApp";
import store from "./modules/store";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById("root")
);
