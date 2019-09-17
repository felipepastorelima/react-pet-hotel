import { createSelector } from 'reselect';

const selectRaw = (state) => state.iam.form;

const selectUser = createSelector(
  [selectRaw],
  (raw) => raw.user,
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
  selectUser,
  selectRaw,
};

export default selectors;
