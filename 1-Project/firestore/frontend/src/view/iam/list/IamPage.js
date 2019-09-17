import React, { Component } from 'react';
import IamFilter from 'view/iam/list/IamFilter';
import IamTable from 'view/iam/list/IamTable';
import IamToolbar from 'view/iam/list/IamToolbar';
import IamViewBy from 'view/iam/list/IamViewBy';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class IamPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('iam.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{i18n('iam.title')}</PageTitle>

          <IamToolbar />
          <IamViewBy />
          <IamFilter />
          <IamTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(IamPage);
