import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import IamEditForm from 'view/iam/edit/IamEditForm';
import { i18n } from 'i18n';

class IamEditPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('iam.menu'), '/iam'],
            [i18n('iam.edit.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{i18n('iam.edit.title')}</PageTitle>

          <IamEditForm match={this.props.match} />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(IamEditPage);
