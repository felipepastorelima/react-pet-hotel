import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';
import { i18n } from 'i18n';
import statuses from 'modules/shared/importer/importerStatuses';
import ImporterErrorStatusMessage from 'view/shared/importer/styles/ImporterErrorStatusMessage';

class ImporterRowStatus extends Component {
  render() {
    const { value, errorMessage } = this.props;

    if (value === statuses.PENDING) {
      return (
        <Tag style={{ cursor: 'default' }}>
          {i18n('importer.pending')}
        </Tag>
      );
    }

    if (value === statuses.IMPORTED) {
      return (
        <Tag color="green" style={{ cursor: 'default' }}>
          {i18n('importer.imported')}
        </Tag>
      );
    }

    if (value === statuses.ERROR) {
      return (
        <React.Fragment>
          <Tag color="red">{i18n('importer.error')}</Tag>
          <ImporterErrorStatusMessage>
            {errorMessage}
          </ImporterErrorStatusMessage>
        </React.Fragment>
      );
    }
  }
}

ImporterRowStatus.propTypes = {
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

export default ImporterRowStatus;
