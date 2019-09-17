import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import importerHoc from 'view/shared/importer/Importer';
import selectors from 'modules/iam/importer/iamImporterSelectors';
import actions from 'modules/iam/importer/iamImporterActions';
import fields from 'modules/iam/importer/iamImporterFields';

const Importer = importerHoc(
  selectors,
  actions,
  fields,
  i18n('iam.importer.hint'),
);

class IamImportPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('iam.menu'), '/iam'],
            [i18n('iam.importer.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('iam.importer.title')}
          </PageTitle>
          <Importer />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(IamImportPage);
