import React, { Component } from 'react';
import { Form, Checkbox } from 'antd';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';

class CheckboxFormItemNotFast extends Component {
  render() {
    const {
      label,
      name,
      form,
      hint,
      layout,
      size,
      formItemProps,
      inputProps,
      errorMessage,
    } = this.props;

    return (
      <Form.Item
        {...layout}
        label={label}
        validateStatus={FormErrors.validateStatus(
          form,
          name,
          errorMessage,
        )}
        help={
          FormErrors.displayableError(
            form,
            name,
            errorMessage,
          ) || hint
        }
        {...formItemProps}
      >
        <Checkbox
          id={name}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          checked={!!form.values[name]}
          size={size || undefined}
          {...inputProps}
        />
      </Form.Item>
    );
  }
}

CheckboxFormItemNotFast.defaultProps = {
  layout: formItemLayout,
};

CheckboxFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
};

class CheckboxFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <CheckboxFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default CheckboxFormItem;
