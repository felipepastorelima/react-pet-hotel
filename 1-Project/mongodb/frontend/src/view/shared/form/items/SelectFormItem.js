import React, { Component } from 'react';
import { Form, Select } from 'antd';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';

class SelectFormItemNotFast extends Component {
  render() {
    const {
      label,
      name,
      form,
      hint,
      layout,
      size,
      placeholder,
      options,
      mode,
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
        validateStatus={FormErrors.validateStatus(
          form,
          name,
          errorMessage,
        )}
        required={required}
        help={
          FormErrors.displayableError(
            form,
            name,
            errorMessage,
          ) || hint
        }
        {...formItemProps}
      >
        <Select
          id={name}
          onChange={(value) =>
            form.setFieldValue(name, value)
          }
          onBlur={() => form.setFieldTouched(name)}
          value={form.values[name]}
          size={size || undefined}
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || false}
          autoComplete={autoComplete || undefined}
          prefix={prefix || undefined}
          mode={mode || undefined}
          allowClear
          {...inputProps}
        >
          {options.map((option) => (
            <Select.Option
              key={option.value}
              value={option.value}
              title={option.title}
            >
              {option.label}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    );
  }
}

SelectFormItemNotFast.defaultProps = {
  layout: formItemLayout,
  required: false,
};

SelectFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  size: PropTypes.string,
  prefix: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
  mode: PropTypes.string,
};

class SelectFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <SelectFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default SelectFormItem;
