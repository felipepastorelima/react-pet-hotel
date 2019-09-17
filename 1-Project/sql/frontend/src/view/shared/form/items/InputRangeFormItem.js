import React, { Component } from 'react';
import { Form, Input } from 'antd';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';

class InputRangeFormItemNotFast extends Component {
  handleStartChanged = (value) => {
    const { form, name } = this.props;
    form.setFieldValue(name, [value, this.endValue()]);
  };

  handleEndChanged = (value) => {
    const { form, name } = this.props;
    form.setFieldValue(name, [this.startValue(), value]);
  };

  value = () => {
    const { form, name } = this.props;
    return form.values[name];
  };

  startValue = () => {
    if (!this.value()) {
      return null;
    }

    if (Array.isArray(!this.value())) {
      return null;
    }

    if (!this.value().length) {
      return null;
    }

    return this.value()[0];
  };

  endValue = () => {
    if (!this.value()) {
      return null;
    }

    if (Array.isArray(!this.value())) {
      return null;
    }

    if (this.value().length < 2) {
      return null;
    }

    return this.value()[1];
  };

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
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'baseline',
          }}
        >
          <Input
            style={{ width: '100%' }}
            id={`${name}Start`}
            type={type}
            onChange={(event) =>
              this.handleStartChanged(event.target.value)
            }
            onBlur={() => form.setFieldTouched(name)}
            value={this.startValue()}
            size={size || undefined}
            placeholder={placeholder || undefined}
            autoFocus={autoFocus || false}
            autoComplete={autoComplete || undefined}
            prefix={prefix || undefined}
            {...inputProps}
          />

          <div
            style={{
              flexShrink: 1,
              marginLeft: '8px',
              marginRight: '8px',
            }}
          >
            ~
          </div>

          <Input
            style={{ width: '100%' }}
            id={`${name}End`}
            type={type}
            onChange={(event) =>
              this.handleEndChanged(event.target.value)
            }
            onBlur={() => form.setFieldTouched(name)}
            value={this.endValue()}
            size={size || undefined}
            placeholder={placeholder || undefined}
            autoFocus={autoFocus || false}
            autoComplete={autoComplete || undefined}
            prefix={prefix || undefined}
            {...inputProps}
          />
        </div>
      </Form.Item>
    );
  }
}

InputRangeFormItemNotFast.defaultProps = {
  layout: formItemLayout,
  type: 'text',
  required: false,
};

InputRangeFormItemNotFast.propTypes = {
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

class InputRangeFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <InputRangeFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default InputRangeFormItem;
