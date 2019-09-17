import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import { i18n } from 'i18n';
import SettingsForm from 'view/settings/SettingsForm';
import SettingsFormToolbar from 'view/settings/SettingsFormToolbar';

class SettingsFormPage extends Component {
  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('settings.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{i18n('settings.title')}</PageTitle>

          <SettingsFormToolbar />

          <SettingsForm />
        </ContentWrapper>
      </React.Fragment>
    );
  }
}

export default Layout(SettingsFormPage);
