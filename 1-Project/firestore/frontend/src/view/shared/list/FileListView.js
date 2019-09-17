import PropTypes from 'prop-types';
import React, { Component } from 'react';
import FilesUploader from 'view/shared/uploaders/FilesUploader';
import styled from 'styled-components';
import { truncate } from 'lodash';

const HideRemoveButtonWrapper = styled.span`
  .anticon-close {
    display: none;
  }
`;

class FilesListView extends Component {
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

  valueWithNamesTruncated = () => {
    return this.valueAsArray().map((value) => ({
      id: value.id,
      name: truncate(value.name),
      publicUrl: value.publicUrl,
    }));
  };

  render() {
    if (!this.valueWithNamesTruncated().length) {
      return null;
    }

    return (
      <HideRemoveButtonWrapper>
        <FilesUploader
          readonly
          value={this.valueWithNamesTruncated()}
        />
      </HideRemoveButtonWrapper>
    );
  }
}

FilesListView.propTypes = {
  value: PropTypes.any,
};

export default FilesListView;
