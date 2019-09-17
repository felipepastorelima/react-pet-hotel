import iamListModeSelectors from 'modules/iam/list/mode/iamListModeSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import IamUsersTable from 'view/iam/list/users/IamUsersTable';
import IamRolesTable from 'view/iam/list/roles/IamRolesTable';

class IamTable extends Component {
  render() {
    return this.props.mode === 'users' ? (
      <IamUsersTable />
    ) : (
      <IamRolesTable />
    );
  }
}

function select(state) {
  return {
    mode: iamListModeSelectors.selectMode(state),
  };
}

export default connect(select)(IamTable);
