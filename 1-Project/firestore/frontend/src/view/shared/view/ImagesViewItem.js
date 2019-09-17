import { Form } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { viewItemLayout } from 'view/shared/styles/ViewWrapper';
import ImagesViewer from 'view/shared/ImagesViewer';

class ImagesViewItem extends Component {
  valueAsArray = () => {
    const { value } = this.props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  render() {
    if (!this.valueAsArray().length) {
      return null;
    }

    return (
      <Form.Item
        {...viewItemLayout}
        label={this.props.label}
      >
        <ImagesViewer
          value={this.valueAsArray()}
        />
      </Form.Item>
    );
  }
}

ImagesViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default ImagesViewItem;
