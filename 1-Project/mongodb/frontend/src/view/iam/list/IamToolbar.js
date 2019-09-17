import iamListModeSelectors from 'modules/iam/list/mode/iamListModeSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import IamUsersToolbar from 'view/iam/list/users/IamUsersToolbar';
import IamRolesToolbar from 'view/iam/list/roles/IamRolesToolbar';

class IamToolbar extends Component {
  render() {
    return this.props.mode === 'users' ? (
      <IamUsersToolbar />
    ) : (
      <IamRolesToolbar />
    );
  }
}

function select(state) {
  return {
    mode: iamListModeSelectors.selectMode(state),
  };
}

export default connect(select)(IamToolbar);
