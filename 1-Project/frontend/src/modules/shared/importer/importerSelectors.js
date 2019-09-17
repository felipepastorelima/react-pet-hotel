import { createSelector } from 'reselect';
import statuses from 'modules/shared/importer/importerStatuses';
import _get from 'lodash/get';

export default (rawPath) => {
  const selectRaw = (state) => _get(state, rawPath);

  const selectRows = createSelector(
    [selectRaw],
    (raw) => raw.rows || [],
  );

  const selectHasRows = createSelector(
    [selectRows],
    (rows) => !!rows.length,
  );

  const selectErrorMessage = createSelector(
    [selectRaw],
    (raw) => raw.errorMessage,
  );

  const selectPendingRows = createSelector(
    [selectRows],
    (rows) =>
      rows.filter(
        (row) => row._status === statuses.PENDING,
      ),
  );

  const selectPendingRowsCount = createSelector(
    [selectPendingRows],
    (pendingRows) => pendingRows.length,
  );

  const selectRowsCount = createSelector(
    [selectRows],
    (rows) => rows.length,
  );

  const selectImportedRowsCount = createSelector(
    [selectRows],
    (rows) =>
      rows.filter(
        (row) => row._status === statuses.IMPORTED,
      ).length,
  );

  const selectNonPendingRowsCount = createSelector(
    [selectRowsCount, selectPendingRowsCount],
    (allCount, pendingCount) => allCount - pendingCount,
  );

  const selectErrorRowsCount = createSelector(
    [selectRows],
    (rows) =>
      rows.filter((row) => row._status === statuses.ERROR)
        .length,
  );

  const selectImporting = createSelector(
    [selectRaw],
    (raw) => raw.importing,
  );

  const selectCompleted = createSelector(
    [selectRaw],
    (raw) => raw.completed,
  );

  const selectPercent = createSelector(
    [selectNonPendingRowsCount, selectRowsCount],
    (nonPendingRowsCount, rowsCount) =>
      (nonPendingRowsCount * 100) / rowsCount,
  );

  const selectors = {
    selectRaw,
    selectRows,
    selectRowsCount,
    selectHasRows,
    selectErrorMessage,
    selectPendingRows,
    selectPendingRowsCount,
    selectImportedRowsCount,
    selectErrorRowsCount,
    selectNonPendingRowsCount,
    selectImporting,
    selectCompleted,
    selectPercent,
  };

  return selectors;
};
