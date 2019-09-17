import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import IamNewForm from 'view/iam/new/IamNewForm';
import { i18n } from 'i18n';

class IamNewPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('iam.menu'), '/iam'],
            [i18n('iam.new.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{i18n('iam.new.title')}</PageTitle>

          <IamNewForm />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(IamNewPage);
