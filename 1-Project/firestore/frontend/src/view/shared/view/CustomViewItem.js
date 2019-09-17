import { Form } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { viewItemLayout } from 'view/shared/styles/ViewWrapper';

class CustomViewItem extends Component {
  isBlank() {
    return (
      (!this.props.value &&
        this.props.value !== 0 &&
        this.props.value !== false) ||
      (Array.isArray(this.props.value) &&
        !this.props.value.length)
    );
  }

  render() {
    if (this.isBlank()) {
      return null;
    }

    return (
      <Form.Item
        {...viewItemLayout}
        label={this.props.label}
      >
        {this.props.render(this.props.value)}
      </Form.Item>
    );
  }
}

CustomViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  render: PropTypes.func,
};

export default CustomViewItem;
