import { Form } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import ImagesUploader from 'view/shared/uploaders/ImagesUploader';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';

class ImagesFormItemNotFast extends Component {
  render() {
    const {
      label,
      name,
      form,
      hint,
      layout,
      path,
      schema,
      max,
      formItemProps,
      inputProps,
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
        )}
        help={
          FormErrors.displayableError(form, name) || hint
        }
        {...formItemProps}
      >
        <ImagesUploader
          path={path}
          schema={schema}
          value={form.values[name]}
          onChange={(value) =>
            form.setFieldValue(name, value)
          }
          max={max}
          {...inputProps}
        />
      </Form.Item>
    );
  }
}

ImagesFormItemNotFast.defaultProps = {
  layout: formItemLayout,
  max: undefined,
  required: false,
};

ImagesFormItemNotFast.propTypes = {
  path: PropTypes.string.isRequired,
  schema: PropTypes.object,

  required: PropTypes.bool,
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  layout: PropTypes.object,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
};

class ImagesFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <ImagesFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default ImagesFormItem;
