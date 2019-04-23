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

const selectDailyFee = createSelector(
  [selectSettings],
  (settings) => {
    return settings && settings.dailyFee;
  },
);

const selectors = {
  selectFindLoading,
  selectSaveLoading,
  selectSettings,
  selectRaw,
  selectDailyFee,
};

export default selectors;
