import { Table } from 'antd';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { i18n } from 'i18n';
import TableWrapper from 'view/shared/styles/TableWrapper';
import ImporterRowStatus from 'view/shared/importer/ImporterRowStatus';

export default (selectors, actions, fields) => {
  class ImporterList extends Component {
    showTotal = (total, range) => {
      const {
        importedRowsCount,
        pendingRowsCount,
        errorRowsCount,
      } = this.props;
      return i18n(
        'importer.total',
        importedRowsCount,
        pendingRowsCount,
        errorRowsCount,
      );
    };

    render() {
      const { rows } = this.props;

      const columns = [
        {
          title: i18n('importer.line'),
          dataIndex: '_line',
          key: '_line',
          width: 100,
          sorter: (a, b) => a._line - b._line,
        },
        ...fields.map((schemaItem) => {
          return {
            title: schemaItem.label,
            dataIndex: schemaItem.name,
            key: schemaItem.name,
            sorter: (a, b) =>
              (
                String(a[schemaItem.name]) || ''
              ).localeCompare(
                String(b[schemaItem.name]) || '',
              ),
            render: (value) => String(value || ''),
          };
        }),
        {
          title: i18n('importer.status'),
          dataIndex: '_status',
          key: '_status',
          width: '200px',
          sorter: (a, b) =>
            (a._status || '').localeCompare(
              b._status || '',
            ),
          render: (value, record) => (
            <ImporterRowStatus
              value={value}
              errorMessage={record._errorMessage}
            />
          ),
        },
      ];

      return (
        <TableWrapper>
          <Table
            rowKey="_line"
            columns={columns}
            dataSource={rows}
            scroll={{ x: true }}
            pagination={{
              showTotal: this.showTotal,
            }}
          />
        </TableWrapper>
      );
    }
  }

  function select(state) {
    return {
      rows: selectors.selectRows(state),
      pendingRowsCount: selectors.selectPendingRowsCount(
        state,
      ),
      errorRowsCount: selectors.selectErrorRowsCount(state),
      importedRowsCount: selectors.selectImportedRowsCount(
        state,
      ),
    };
  }

  return connect(select)(ImporterList);
};
