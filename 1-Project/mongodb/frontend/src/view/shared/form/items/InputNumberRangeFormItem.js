import React, { Component } from 'react';
import { Form, InputNumber } from 'antd';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';

class InputNumberRangeFormItemNotFast extends Component {
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
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            alignItems: 'baseline',
          }}
        >
          <InputNumber
            style={{ width: '100%' }}
            id={`${name}Start`}
            onChange={(value) =>
              this.handleStartChanged(value)
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

          <InputNumber
            style={{ width: '100%' }}
            id={`${name}End`}
            onChange={(value) =>
              this.handleEndChanged(value)
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

InputNumberRangeFormItemNotFast.defaultProps = {
  layout: formItemLayout,
  required: false,
};

InputNumberRangeFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
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
};

class InputNumberRangeFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <InputNumberRangeFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default InputNumberRangeFormItem;
