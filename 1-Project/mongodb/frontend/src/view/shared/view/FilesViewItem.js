import { Form } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { viewItemLayout } from 'view/shared/styles/ViewWrapper';
import FilesUploader from 'view/shared/uploaders/FilesUploader';
import styled from 'styled-components';

const HideRemoveButtonWrapper = styled.span`
  .anticon-close {
    display: none;
  }
`;

class FilesViewItem extends Component {
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

  displayableRecord = (record) => {
    return (
      <div>
        <a
          key={record.id}
          href={record.publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          {record.name}
        </a>
      </div>
    );
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
        <HideRemoveButtonWrapper>
          <FilesUploader
            readonly
            value={this.valueAsArray()}
          />
        </HideRemoveButtonWrapper>
      </Form.Item>
    );
  }
}

FilesViewItem.propTypes = {
  label: PropTypes.string,
  value: PropTypes.any,
};

export default FilesViewItem;
