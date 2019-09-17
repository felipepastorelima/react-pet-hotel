import { Form } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { viewItemLayout } from 'view/shared/styles/ViewWrapper';

class TextViewItem extends Component {
  render() {
    if (
      !this.props.value &&
      this.props.value !== 0 &&
      this.props.value !== false
    ) {
      return null;
    }

    return (
      <Form.Item
        {...viewItemLayout}
        label={this.props.label}
      >
        <strong>
          {this.props.prefix ? `${this.props.prefix} ` : ''}
          {this.props.value}
        </strong>
      </Form.Item>
    );
  }
}

TextViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
  prefix: PropTypes.string,
};

export default TextViewItem;
