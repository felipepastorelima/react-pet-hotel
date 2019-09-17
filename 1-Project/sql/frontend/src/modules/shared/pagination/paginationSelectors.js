import { createSelector } from 'reselect';
import _get from 'lodash/get';

export default (rawPath, unlimited) => {
  const selectRaw = (state) => _get(state, rawPath);

  const selectLoading = createSelector(
    [selectRaw],
    (raw) => raw.loading,
  );

  const selectExportLoading = createSelector(
    [selectRaw],
    (raw) => raw.exportLoading,
  );

  const selectRows = createSelector(
    [selectRaw],
    (raw) => raw.rows,
  );

  const selectCount = createSelector(
    [selectRaw],
    (raw) => raw.count,
  );

  const selectHasRows = createSelector(
    [selectCount],
    (count) => count > 0,
  );

  const selectOrderBy = createSelector(
    [selectRaw],
    (raw) => {
      const sorter = raw.sorter;

      if (!sorter) {
        return null;
      }

      if (!sorter.columnKey) {
        return null;
      }

      let direction =
        sorter.order === 'descend' ? 'DESC' : 'ASC';

      return `${sorter.columnKey}_${direction}`;
    },
  );

  const selectFilter = createSelector(
    [selectRaw],
    (raw) => {
      return raw.filter;
    },
  );

  const selectLimit = createSelector([selectRaw], (raw) => {
    if (unlimited) {
      return 0;
    }

    const pagination = raw.pagination;
    return pagination.pageSize;
  });

  const selectOffset = createSelector(
    [selectRaw],
    (raw) => {
      if (unlimited) {
        return 0;
      }

      const pagination = raw.pagination;

      if (!pagination || !pagination.pageSize) {
        return 0;
      }

      const current = pagination.current || 1;

      return (current - 1) * pagination.pageSize;
    },
  );

  const selectPagination = createSelector(
    [selectRaw, selectCount],
    (raw, count) => {
      if (unlimited) {
        return false;
      }

      return {
        ...raw.pagination,
        total: count,
        showSizeChanger: true,
      };
    },
  );

  const selectSelectedKeys = createSelector(
    [selectRaw],
    (raw) => {
      return raw.selectedKeys;
    },
  );

  const selectSelectedRows = createSelector(
    [selectRaw, selectRows],
    (raw, rows) => {
      return rows.filter((row) =>
        raw.selectedKeys.includes(row.id),
      );
    },
  );

  return {
    selectLoading,
    selectRows,
    selectCount,
    selectOrderBy,
    selectLimit,
    selectFilter,
    selectOffset,
    selectPagination,
    selectSelectedKeys,
    selectSelectedRows,
    selectHasRows,
    selectExportLoading,
  };
};
