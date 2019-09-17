import React, { Component } from 'react';
import { Form, Switch } from 'antd';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';

class SwitchFormItemNotFast extends Component {
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
        <Switch
          id={name}
          onChange={(checked) =>
            form.setFieldValue(name, checked)
          }
          onBlur={form.handleBlur}
          checked={!!form.values[name]}
          size={size || undefined}
          {...inputProps}
        />
      </Form.Item>
    );
  }
}

SwitchFormItemNotFast.defaultProps = {
  layout: formItemLayout,
};

SwitchFormItemNotFast.propTypes = {
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

class SwitchFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <SwitchFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default SwitchFormItem;
