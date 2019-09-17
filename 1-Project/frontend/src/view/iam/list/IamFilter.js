import iamListModeSelectors from 'modules/iam/list/mode/iamListModeSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import IamUsersFilter from 'view/iam/list/users/IamUsersFilter';
import IamRolesFilter from 'view/iam/list/roles/IamRolesFilter';

class IamFilter extends Component {
  render() {
    return this.props.mode === 'users' ? (
      <IamUsersFilter />
    ) : (
      <IamRolesFilter />
    );
  }
}

function select(state) {
  return {
    mode: iamListModeSelectors.selectMode(state),
  };
}

export default connect(select)(IamFilter);
