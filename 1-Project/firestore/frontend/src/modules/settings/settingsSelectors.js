import { createSelector } from 'reselect';

const selectRaw = (state) => state.settings;

const selectSettings = createSelector(
  [selectRaw],
  (raw) => raw.settings,
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
  selectSettings,
  selectRaw,
};

export default selectors;
