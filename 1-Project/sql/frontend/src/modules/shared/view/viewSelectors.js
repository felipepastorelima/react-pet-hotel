import { createSelector } from 'reselect';
import _get from 'lodash/get';

export default (rawPath) => {
  const selectRaw = (state) => _get(state, rawPath);

  const selectRecord = createSelector(
    [selectRaw],
    (raw) => raw.record,
  );

  const selectLoading = createSelector(
    [selectRaw],
    (raw) => !!raw.loading,
  );

  const selectors = {
    selectLoading,
    selectRecord,
    selectRaw,
  };

  return selectors;
};
