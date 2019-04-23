import React, { Component } from 'react';
import Toolbar from 'view/shared/styles/Toolbar';
import { Button, Tooltip } from 'antd';
import { connect } from 'react-redux';
import iamSelectors from 'modules/iam/iamSelectors';
import selectors from 'modules/iam/list/roles/iamListRolesSelectors';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';
import actions from 'modules/iam/list/roles/iamListRolesActions';
import { Link } from 'react-router-dom';
import { i18n } from 'i18n';

class IamRolesToolbar extends Component {
  doRemoveAllSelected = () => {
    const { dispatch } = this.props;
    dispatch(actions.doRemoveAllSelected());
  };

  doDisableAllSelected = () => {
    const { dispatch } = this.props;
    dispatch(actions.doDisableAllSelected());
  };

  doEnableAllSelected = () => {
    const { dispatch } = this.props;
    dispatch(actions.doEnableAllSelected());
  };

  renderRemoveButton() {
    const {
      selectedKeys,
      loading,
      hasPermissionToRemove,
    } = this.props;

    if (!hasPermissionToRemove) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <Button
        disabled={disabled}
        type="primary"
        icon="user-delete"
        onClick={this.doRemoveAllSelected}
      >
        {i18n('common.remove')}
      </Button>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          {button}
        </Tooltip>
      );
    }

    return button;
  }

  renderEnableButton() {
    const {
      selectedKeys,
      loading,
      hasPermissionToChangeStatus,
    } = this.props;

    if (!hasPermissionToChangeStatus) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <Button
        disabled={disabled}
        type="primary"
        icon="check"
        onClick={this.doEnableAllSelected}
      >
        {i18n('iam.enable')}
      </Button>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          {button}
        </Tooltip>
      );
    }

    return button;
  }

  renderDisableButton() {
    const {
      selectedKeys,
      loading,
      hasPermissionToChangeStatus,
    } = this.props;

    if (!hasPermissionToChangeStatus) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <Button
        disabled={disabled}
        type="primary"
        icon="stop"
        onClick={this.doDisableAllSelected}
      >
        {i18n('iam.disable')}
      </Button>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          {button}
        </Tooltip>
      );
    }

    return button;
  }

  render() {
    return (
      <Toolbar>
        {this.props.hasPermissionToCreate && (
          <Link to="/iam/new">
            <Button type="primary" icon="user-add">
              {i18n('common.new')}
            </Button>
          </Link>
        )}

        {this.props.hasPermissionToImport && (
          <Link to="/iam/importer">
            <Button type="primary" icon="upload">
              {i18n('common.import')}
            </Button>
          </Link>
        )}

        {this.renderRemoveButton()}
        {this.renderEnableButton()}
        {this.renderDisableButton()}

        {this.props.hasPermissionToAuditLogs && (
          <Link to="/audit-logs?entityNames=user">
            <Button icon="file-search">
              {i18n('auditLog.menu')}
            </Button>
          </Link>
        )}
      </Toolbar>
    );
  }
}

function select(state) {
  return {
    selectedKeys: selectors.selectSelectedKeys(state),
    loading: selectors.selectLoading(state),
    hasPermissionToAuditLogs: auditLogSelectors.selectPermissionToRead(
      state,
    ),
    hasPermissionToCreate: iamSelectors.selectPermissionToCreate(
      state,
    ),
    hasPermissionToImport: iamSelectors.selectPermissionToImport(
      state,
    ),
    hasPermissionToChangeStatus: iamSelectors.selectPermissionToChangeStatus(
      state,
    ),
    hasPermissionToRemove: iamSelectors.selectPermissionToRemove(
      state,
    ),
  };
}

export default connect(select)(IamRolesToolbar);
