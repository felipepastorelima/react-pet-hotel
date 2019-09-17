import React, { Component } from 'react';
import { Form } from 'antd';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import RadioGroup from 'antd/lib/radio/group';
import { FastField } from 'formik';

class RadioFormItemNotFast extends Component {
  render() {
    const {
      label,
      name,
      form,
      hint,
      layout,
      options,
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
        <RadioGroup
          id={name}
          onChange={(e) =>
            form.setFieldValue(name, e.target.value)
          }
          options={options}
          onBlur={() => form.setFieldTouched(name)}
          value={form.values[name]}
          {...inputProps}
        />
      </Form.Item>
    );
  }
}

RadioFormItemNotFast.defaultProps = {
  layout: formItemLayout,
  required: false,
};

RadioFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
};

class RadioFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <RadioFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default RadioFormItem;
