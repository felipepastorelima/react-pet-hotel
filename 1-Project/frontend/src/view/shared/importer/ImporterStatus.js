import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Progress, Alert } from 'antd';
import { i18n } from 'i18n';
import ImporterStatusWrapper from 'view/shared/importer/styles/ImporterStatusWrapper';

export default (selectors) => {
  class ImporterStatus extends Component {
    renderCompleted() {
      return (
        <Alert
          message={i18n('importer.completed.success')}
          type="success"
          showIcon
        />
      );
    }

    renderCompletedSomeErrors() {
      return (
        <Alert
          message={i18n('importer.completed.someErrors')}
          type="warning"
          showIcon
        />
      );
    }

    renderCompletedAllErrors() {
      return (
        <Alert
          message={i18n('importer.completed.allErrors')}
          type="error"
          showIcon
        />
      );
    }

    renderProcessing() {
      return (
        <React.Fragment>
          <Progress
            percent={this.props.percent}
            showInfo={false}
            status="active"
          />
          <p>
            {i18n(
              'importer.importedMessage',
              this.props.nonPendingRowsCount,
              this.props.rowsCount,
            )}{' '}
            {i18n('importer.noNavigateAwayMessage')}
          </p>
        </React.Fragment>
      );
    }

    renderBody() {
      const {
        completed,
        errorRowsCount,
        rowsCount,
      } = this.props;

      const isAllErrors = errorRowsCount === rowsCount;

      if (completed && isAllErrors) {
        return this.renderCompletedAllErrors();
      }

      const isSomeErrors = !!errorRowsCount;

      if (completed && isSomeErrors) {
        return this.renderCompletedSomeErrors();
      }

      const allSuccess = !errorRowsCount;

      if (completed && allSuccess) {
        return this.renderCompleted();
      }

      return this.renderProcessing();
    }

    render() {
      const { importing, completed } = this.props;

      if (!importing && !completed) {
        return null;
      }

      return (
        <ImporterStatusWrapper>
          {this.renderBody()}
        </ImporterStatusWrapper>
      );
    }
  }

  function select(state) {
    return {
      completed: selectors.selectCompleted(state),
      importing: selectors.selectImporting(state),
      nonPendingRowsCount: selectors.selectNonPendingRowsCount(
        state,
      ),
      rowsCount: selectors.selectRowsCount(state),
      percent: selectors.selectPercent(state),
      errorRowsCount: selectors.selectErrorRowsCount(state),
    };
  }

  return connect(select)(ImporterStatus);
};
