import { createSelector } from 'reselect';
import _get from 'lodash/get';

export default (rawPath) => {
  const selectRaw = (state) => _get(state, rawPath);

  const selectRecord = createSelector(
    [selectRaw],
    (raw) => raw.record,
  );

  const selectFindLoading = createSelector(
    [selectRaw],
    (raw) => !!raw.findLoading,
  );

  const selectSaveLoading = createSelector(
    [selectRaw],
    (raw) => !!raw.saveLoading,
  );

  const selectors = {
    selectFindLoading,
    selectSaveLoading,
    selectRecord,
    selectRaw,
  };

  return selectors;
};
