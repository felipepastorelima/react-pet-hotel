import React, { Component } from 'react';
import { connect } from 'react-redux';
import iamSelectors from 'modules/iam/iamSelectors';
import selectors from 'modules/iam/list/roles/iamListRolesSelectors';
import actions from 'modules/iam/list/roles/iamListRolesActions';
import { Table, Tooltip, Tag } from 'antd';
import Roles from 'security/roles';
import { Link } from 'react-router-dom';
import TableWrapper from 'view/shared/styles/TableWrapper';
import { i18n } from 'i18n';
import model from 'modules/auth/userModel';

const { fields } = model;

class IamRolesTable extends Component {
  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;

    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  columns = [
    fields.roleUser.forTable({
      sorter: true,
      dataIndex: 'role',
      render: (roleId, record) => {
        if (record.type === 'user') {
          return record.email;
        }

        return (
          <Tooltip title={Roles.descriptionOf(roleId)}>
            <span>
              {Roles.labelOf(roleId)} (
              {record.children.length})
            </span>
          </Tooltip>
        );
      },
    }),
    fields.fullName.forTable(),
    fields.disabledAsStatus.forTable({
      sorter: false,
      render: (disabled, record) => {
        if (record.type === 'role') {
          return;
        }

        const color = disabled ? 'red' : 'green';
        return (
          <Tag color={color}>
            {fields.disabledAsStatus.forView(disabled)}
          </Tag>
        );
      },
    }),
    {
      title: '',
      dataIndex: '',
      width: '160px',
      render: (_, record) => {
        if (record.type === 'role') {
          return null;
        }

        let view = (
          <Link to={`/iam/${record.userId}`}>
            {i18n('common.view')}
          </Link>
        );

        let edit = (
          <Link to={`/iam/${record.userId}/edit`}>
            {i18n('common.edit')}
          </Link>
        );

        return (
          <div className="table-actions">
            {view}
            {this.props.hasPermissionToEdit && edit}
          </div>
        );
      },
    },
  ];

  rowSelection = () => {
    return {
      selectedRowKeys: this.props.selectedKeys,
      onChange: (selectedRowKeys) => {
        const { dispatch } = this.props;
        dispatch(actions.doChangeSelected(selectedRowKeys));
      },
      getCheckboxProps: (record) => ({
        disabled: record.type === 'role',
      }),
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
    rows: selectors.selectRowsAsTree(state),
    pagination: selectors.selectPagination(state),
    filter: selectors.selectFilter(state),
    selectedKeys: selectors.selectSelectedKeys(state),
    hasPermissionToEdit: iamSelectors.selectPermissionToEdit(
      state,
    ),
  };
}

export default connect(select)(IamRolesTable);
