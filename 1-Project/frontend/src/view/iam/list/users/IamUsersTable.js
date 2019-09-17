import React, { Component } from 'react';
import { connect } from 'react-redux';
import iamSelectors from 'modules/iam/iamSelectors';
import selectors from 'modules/iam/list/users/iamListUsersSelectors';
import actions from 'modules/iam/list/users/iamListUsersActions';
import { Table, Tooltip, Tag, Avatar } from 'antd';
import Roles from 'security/roles';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import { i18n } from 'i18n';
import model from 'modules/auth/userModel';

const { fields } = model;

class IamUsersTable extends Component {
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;

    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  columns = [
    fields.avatarsIam.forTable({
      render: (_, record) => {
        return (
          <Avatar
            src={
              record.avatars && record.avatars.length
                ? record.avatars[0].publicUrl
                : undefined
            }
            alt="avatar"
          />
        );
      },
    }),
    fields.email.forTable(),
    fields.fullName.forTable(),
    fields.roles.forTable({
      render: (roles) =>
        roles.map((roleId) => (
          <div key={roleId}>
            <Tooltip title={Roles.descriptionOf(roleId)}>
              <span>{Roles.labelOf(roleId)}</span>
            </Tooltip>
          </div>
        )),
    }),
    fields.disabledAsStatus.forTable({
      dataIndex: 'disabled',
      render: (disabled) => {
        const color = disabled ? 'red' : 'green';
        return (
          <Tag color={color}>
            {fields.disabledAsStatus.forView(disabled)}
          </Tag>
        );
      },
    }),
    fields.createdAt.forTable(),
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => (
        <div className="table-actions">
          <Link to={`/iam/${record.id}`}>
            {i18n('common.view')}
          </Link>
          {this.props.hasPermissionToEdit && (
            <Link to={`/iam/${record.id}/edit`}>
              {i18n('common.edit')}
            </Link>
          )}
        </div>
      ),
    },
  ];

  rowSelection = () => {
    return {
      selectedRowKeys: this.props.selectedKeys,
      onChange: (selectedRowKeys) => {
        const { dispatch } = this.props;
        dispatch(actions.doChangeSelected(selectedRowKeys));
      },
    };
  };

  render() {
    const { pagination, rows, loading } = this.props;

    return (
      <TableWrapper>
        <Table
          rowKey="id"
          loading={loading}
          columns={this.columns}
          dataSource={rows}
          pagination={pagination}
          onChange={this.handleTableChange}
          rowSelection={this.rowSelection()}
          scroll={{ x: true }}
        />
      </TableWrapper>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    rows: selectors.selectRows(state),
    pagination: selectors.selectPagination(state),
    filter: selectors.selectFilter(state),
    selectedKeys: selectors.selectSelectedKeys(state),
    hasPermissionToEdit: iamSelectors.selectPermissionToEdit(
      state,
    ),
  };
}

export default connect(select)(IamUsersTable);
