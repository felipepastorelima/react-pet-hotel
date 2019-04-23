import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import { formItemLayout } from 'view/shared/styles/FormWrapper';
import { FastField } from 'formik';

class ViewFormItemNotFast extends Component {
  render() {
    const {
      label,
      name,
      form,
      layout,
      formatter,
    } = this.props;

    return (
      <Form.Item {...layout} label={label}>
        <strong>
          {formatter
            ? formatter(form.values[name])
            : form.values[name]}
        </strong>
      </Form.Item>
    );
  }
}

ViewFormItemNotFast.defaultProps = {
  layout: formItemLayout,
};

ViewFormItemNotFast.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  layout: PropTypes.object,
  formatter: PropTypes.func,
};

class ViewFormItem extends Component {
  render() {
    return (
      <FastField
        name={this.props.name}
        render={({ form }) => (
          <ViewFormItemNotFast
            {...this.props}
            form={form}
          />
        )}
      />
    );
  }
}

export default ViewFormItem;
