import { Button } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'i18n';
import Toolbar from 'view/shared/styles/Toolbar';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';
import { connect } from 'react-redux';

class SettingsFormToolbar extends Component {
  render() {
    return (
      <Toolbar>
        {this.props.hasPermissionToAuditLogs && (
          <Link to={`/audit-logs?entityNames=settings`}>
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
    hasPermissionToAuditLogs: auditLogSelectors.selectPermissionToRead(
      state,
    ),
  };
}

export default connect(select)(SettingsFormToolbar);
