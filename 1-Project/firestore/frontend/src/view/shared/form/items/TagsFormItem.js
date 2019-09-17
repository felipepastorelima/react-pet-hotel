import React, { Component } from 'react';
import { Form, Select } from 'antd';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import PropTypes from 'prop-types';
import FormErrors from 'view/shared/form/formErrors';
import { FastField } from 'formik';

class TagsFormItemNotFast extends Component {
  render() {
    const {
      label,
      name,
      form,
      hint,
      layout,
      placeholder,
      autoFocus,
      autoComplete,
      notFoundContent,
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
          mode="tags"
          style={{ width: '100%' }}
          value={form.values[name]}
          onChange={(value) =>
            form.setFieldValue(name, value)
          }
          onBlur={() => form.setFieldTouched(name)}
          notFoundContent={notFoundContent}
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || false}
          autoComplete={autoComplete || undefined}
          {...inputProps}
        />
      </Form.Item>
    );
  }
}

TagsFormItemNotFast.defaultProps = {
  layout: formItemLayout,
  tokenSeparators: [','],
  required: false,
};

TagsFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  hint: PropTypes.string,
  autoFocus: PropTypes.bool,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
  layout: PropTypes.object,
  errorMessage: PropTypes.string,
  notFoundContent: PropTypes.string,
  formItemProps: PropTypes.object,
  inputProps: PropTypes.object,
};

class TagsFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <TagsFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default TagsFormItem;
