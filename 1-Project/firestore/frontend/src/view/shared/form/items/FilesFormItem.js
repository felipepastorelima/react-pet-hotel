import { Form } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import FilesUploader from 'view/shared/uploaders/FilesUploader';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';

class FilesFormItemNotFast extends Component {
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
        validateStatus={FormErrors.validateStatus(
          form,
          name,
        )}
        help={
          FormErrors.displayableError(form, name) || hint
        }
        required={required}
        {...formItemProps}
      >
        <FilesUploader
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

FilesFormItemNotFast.defaultProps = {
  layout: formItemLayout,
  max: undefined,
  required: false,
};

FilesFormItemNotFast.propTypes = {
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

class FilesFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <FilesFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default FilesFormItem;
