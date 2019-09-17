import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';

export class InputFormItemNotFast extends Component {
  render() {
    const {
      label,
      name,
      form,
      hint,
      layout,
      size,
      type,
      placeholder,
      autoFocus,
      autoComplete,
      prefix,
      formItemProps,
      inputProps,
      errorMessage,
      required,
    } = this.props;

    return (
      <Form.Item
        {...layout}
        label={label}
        required={required}
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
        <Input
          id={name}
          type={type}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          value={form.values[name]}
          size={size || undefined}
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || false}
          autoComplete={autoComplete || undefined}
          prefix={prefix || undefined}
          {...inputProps}
        />
      </Form.Item>
    );
  }
}

InputFormItemNotFast.defaultProps = {
  layout: formItemLayout,
  type: 'text',
  required: false,
};

InputFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  type: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
};

class InputFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <InputFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default InputFormItem;
