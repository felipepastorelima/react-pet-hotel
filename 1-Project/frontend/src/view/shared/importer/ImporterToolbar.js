import { Button, Icon, Popconfirm, Tooltip } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { i18n } from 'i18n';
import Toolbar from 'view/shared/styles/Toolbar';

export default (
  selectors,
  actions,
  fields,
  templateHelp,
) => {
  class ImporterToolbar extends Component {
    doReset = () => {
      const { dispatch } = this.props;
      dispatch(actions.doReset());
    };

    doPause = () => {
      const { dispatch } = this.props;
      dispatch(actions.doPause());
    };

    doImport = () => {
      const { dispatch } = this.props;
      dispatch(actions.doImport());
    };

    doDownloadTemplate = () => {
      const { dispatch } = this.props;
      dispatch(actions.doDownloadTemplate());
    };

    render() {
      const { hasRows, importing, completed } = this.props;

      const showDownloadTemplate = !hasRows;
      const showImport =
        hasRows && !importing && !completed;
      const showDiscard =
        hasRows && !importing && !completed;
      const showNew = !!completed;
      const showPause = hasRows && importing;

      return (
        <Toolbar>
          {showDownloadTemplate && (
            <React.Fragment>
              <Button
                onClick={this.doDownloadTemplate}
                icon="file-excel"
              >
                {i18n('importer.form.downloadTemplate')}
              </Button>

              {templateHelp && (
                <Tooltip title={templateHelp}>
                  <Icon
                    style={{ fontSize: '18px' }}
                    type="info-circle"
                  />
                </Tooltip>
              )}
            </React.Fragment>
          )}

          {showImport && (
            <Button
              onClick={this.doImport}
              icon="save"
              type="primary"
            >
              {i18n('common.import')}
            </Button>
          )}

          {showPause && (
            <Button onClick={this.doPause} icon="pause">
              {i18n('common.pause')}
            </Button>
          )}

          {showNew && (
            <Popconfirm
              title={i18n('common.areYouSure')}
              onConfirm={this.doReset}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
              <Button icon="file">
                {i18n('common.new')}
              </Button>
            </Popconfirm>
          )}

          {showDiscard && (
            <Popconfirm
              title={i18n('importer.list.discardConfirm')}
              onConfirm={this.doReset}
              okText={i18n('common.yes')}
              cancelText={i18n('common.no')}
            >
              <Button icon="delete">
                {i18n('common.discard')}
              </Button>
            </Popconfirm>
          )}
        </Toolbar>
      );
    }
  }

  function select(state) {
    return {
      hasRows: selectors.selectHasRows(state),
      importing: selectors.selectImporting(state),
      completed: selectors.selectCompleted(state),
    };
  }

  return connect(select)(ImporterToolbar);
};
