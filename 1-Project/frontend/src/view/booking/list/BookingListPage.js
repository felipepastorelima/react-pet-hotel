import React, { Component } from 'react';
import BookingListFilter from 'view/booking/list/BookingListFilter';
import BookingListTable from 'view/booking/list/BookingListTable';
import BookingListToolbar from 'view/booking/list/BookingListToolbar';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';

class BookingListPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('entities.booking.menu')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>
            {i18n('entities.booking.list.title')}
          </PageTitle>

          <BookingListToolbar />
          <BookingListFilter />
          <BookingListTable />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(BookingListPage);
