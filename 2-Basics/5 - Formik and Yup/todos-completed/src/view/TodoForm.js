import React from "react";
import { connect } from "react-redux";
import todosSelectors from "../modules/todos/todosSelectors";
import todosActions from "../modules/todos/todosActions";
import { Formik } from "formik";
import * as yup from "yup";
import delay from "delay";

async function validateIsStudy(value) {
  await delay(2000);
  return value === "study";
}

class TodoForm extends React.Component {
  validationSchema = () => {
    return yup.object({
      text: yup
        .string()
        .min(2)
        .max(25)
        .required()
        .test("test-study", "Is not study", value => {
          return validateIsStudy(value);
        })
    });
  };

  render() {
    return (
      <Formik
        validationSchema={this.validationSchema()}
        initialValues={{ text: "" }}
        onSubmit={this.handleSubmit}
        render={form => (
          <form onSubmit={form.handleSubmit}>
            <label htmlFor="new-todo">What needs to be done?</label>
            <input
              id="new-todo"
              onChange={e => form.setFieldValue("text", e.target.value)}
              value={form.values.text}
            />
            {form.errors.text && <div>{form.errors.text}</div>}
            <button disabled={form.isSubmitting}>
              Add #{this.props.count + 1}
            </button>
          </form>
        )}
      />
    );
  }

  handleSubmit = (values, form) => {
    const newItem = {
      text: values.text,
      id: Date.now()
    };

    this.props.dispatch(todosActions.doAddTodo(newItem));
    form.resetForm();
  };
}

const select = state => {
  return {
    count: todosSelectors.selectCount(state)
  };
};

export default connect(select)(TodoForm);
