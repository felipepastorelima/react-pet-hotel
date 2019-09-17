import React, { Component } from 'react';
import PetListFilter from 'view/pet/list/PetListFilter';
import PetListTable from 'view/pet/list/PetListTable';
import PetListToolbar from 'view/pet/list/PetListToolbar';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class PetListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.pet.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.pet.list.title')}
          </PageTitle>

          <PetListToolbar />
          <PetListFilter />
          <PetListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(PetListPage);
