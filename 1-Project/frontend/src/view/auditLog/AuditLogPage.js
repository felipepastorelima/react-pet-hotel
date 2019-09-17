import React, { Component } from 'react';
import { i18n } from 'i18n';
import AuditLogFilter from 'view/auditLog/AuditLogFilter';
import AuditLogTable from 'view/auditLog/AuditLogTable';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import AuditLogToolbar from 'view/auditLog/AuditLogToolbar';

class AuditLogPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('auditLog.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{i18n('auditLog.title')}</PageTitle>
          <AuditLogToolbar />
          <AuditLogFilter />
          <AuditLogTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(AuditLogPage);
