import { Table } from 'antd';
import actions from 'modules/auditLog/auditLogActions';
import selectors from 'modules/auditLog/auditLogSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import TableWrapper from 'view/shared/styles/TableWrapper';
import ButtonLink from 'view/shared/styles/ButtonLink';
import AuditLogViewModal from 'view/auditLog/AuditLogViewModal';
import model from 'modules/auditLog/auditLogModel';
import { i18n } from 'i18n';

const { fields } = model;

class AuditLogTable extends Component {
  state = {
    selectedValues: null,
  };

  onAuditLogViewModalClose() {
    this.setState({ selectedValues: null });
  }

  handleTableChange = (pagination, filters, sorter) => {
    const { dispatch } = this.props;

    dispatch(
      actions.doChangePaginationAndSort(pagination, sorter),
    );
  };

  columns = [
    fields.timestamp.forTable(),
    fields.createdByEmail.forTable(),
    fields.entityName.forTable(),
    fields.action.forTable(),
    fields.entityId.forTable(),
    fields.values.forTable({
      title: null,
      render: (values) => {
        return (
          <ButtonLink
            onClick={() =>
              this.setState({
                selectedValues: JSON.stringify(
                  values,
                  null,
                  2,
                ),
              })
            }
          >
            {i18n('common.view')}
          </ButtonLink>
        );
      },
    }),
  ];

  render() {
    const { pagination, rows, loading } = this.props;

    return (
      <React.Fragment>
        <TableWrapper>
          <Table
            rowKey="id"
            loading={loading}
            columns={this.columns}
            dataSource={rows}
            pagination={pagination}
            onChange={this.handleTableChange}
            scroll={{ x: true }}
          />
        </TableWrapper>

        <AuditLogViewModal
          visible={!!this.state.selectedValues}
          code={this.state.selectedValues}
          onCancel={() => this.onAuditLogViewModalClose()}
        />
      </React.Fragment>
    );
  }
}

function select(state) {
  return {
    loading: selectors.selectLoading(state),
    rows: selectors.selectRows(state),
    pagination: selectors.selectPagination(state),
    filter: selectors.selectFilter(state),
  };
}

export default connect(select)(AuditLogTable);
