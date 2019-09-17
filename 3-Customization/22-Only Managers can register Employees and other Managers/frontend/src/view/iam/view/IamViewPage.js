import React, { Component } from 'react';
import Layout from 'view/layout/Layout';
import ContentWrapper from 'view/layout/styles/ContentWrapper';
import PageTitle from 'view/shared/styles/PageTitle';
import Breadcrumb from 'view/shared/Breadcrumb';
import IamView from 'view/iam/view/IamView';
import { i18n } from 'i18n';
import actions from 'modules/iam/view/iamViewActions';
import { connect } from 'react-redux';
import iamSelectors from 'modules/iam/iamSelectors';
import selectors from 'modules/iam/view/iamViewSelectors';
import auditLogSelectors from 'modules/auditLog/auditLogSelectors';
import IamViewToolbar from 'view/iam/view/IamViewToolbar';

class IamViewPage extends Component {
  componentDidMount() {
    const { dispatch, match } = this.props;
    dispatch(actions.doFind(match.params.id));
  }

  render() {
    return (
      <React.Fragment>
        <Breadcrumb
          items={[
            [i18n('home.menu'), '/'],
            [i18n('iam.menu'), '/iam'],
            [i18n('iam.view.title')],
          ]}
        />

        <ContentWrapper>
          <PageTitle>{i18n('iam.view.title')}</PageTitle>

          <IamViewToolbar match={this.props.match} />

          <IamView
            loading={this.props.loading}
            user={this.props.user}
          />
        </ContentWrapper>
      </React.Fragment>
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
  };
}

export default connect(select)(Layout(IamViewPage));
