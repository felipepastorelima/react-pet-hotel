import { Button, Popconfirm } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'i18n';
import Toolbar from 'view/shared/styles/Toolbar';
import actions from 'modules/iam/view/iamViewActions';
import { connect } from 'react-redux';
import iamSelectors from 'modules/iam/iamSelectors';
import selectors from 'modules/iam/view/iamViewSelectors';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';

class IamViewToolbar extends Component {
  doToggleStatus = () => {
    const { dispatch } = this.props;
    dispatch(actions.doToggleStatus());
  };

  render() {
    const {
      match,
      user,
      hasPermissionToEditRecord,
      hasPermissionToAuditLogs,
      hasPermissionToChangeStatus,
      loading,
    } = this.props;

    const id = match.params.id;

    return (
      <Toolbar>
        {hasPermissionToEditRecord(user) && (
          <Link to={`/iam/${id}/edit`}>
            <Button type="primary" icon="edit">
              {i18n('common.edit')}
            </Button>
          </Link>
        )}

        {user && hasPermissionToChangeStatus && (
          <Popconfirm
            title={i18n('common.areYouSure')}
            onConfirm={() => this.doToggleStatus()}
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          >
            <Button
              type="primary"
              icon={user.disabled ? 'check' : 'stop'}
              disabled={loading}
            >
              {user.disabled
                ? i18n('iam.enable')
                : i18n('iam.disable')}
            </Button>
          </Popconfirm>
        )}

        {hasPermissionToAuditLogs && (
          <Link
            to={`/audit-logs?entityId=${encodeURIComponent(
              id,
            )}`}
          >
            <Button icon="file-search">
              {i18n('auditLog.menu')}
            </Button>
          </Link>
        )}

        {user && user.email && hasPermissionToAuditLogs && (
          <Link
            to={`/audit-logs?createdByEmail=${encodeURIComponent(
              user.email,
            )}`}
          >
            <Button icon="eye">
              {i18n('iam.view.activity')}
            </Button>
          </Link>
        )}
      </Toolbar>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    user: selectors.selectUser(state),
    hasPermissionToAuditLogs: auditLogSelectors.selectPermissionToRead(
      state,
    ),
    hasPermissionToEditRecord: iamSelectors.selectPermissionToEditRecord(
      state,
    ),
    hasPermissionToChangeStatus: iamSelectors.selectPermissionToChangeStatus(
      state,
    ),
  };
}

export default connect(select)(IamViewToolbar);
