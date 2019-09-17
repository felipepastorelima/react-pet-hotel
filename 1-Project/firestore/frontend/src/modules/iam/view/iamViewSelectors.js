import { createSelector } from 'reselect';

const selectRaw = (state) => state.iam.view;

const selectUser = createSelector(
  [selectRaw],
  (raw) => raw.user,
);

const selectLoading = createSelector(
  [selectRaw],
  (raw) => !!raw.loading,
);

const selectors = {
  selectLoading,
  selectUser,
  selectRaw,
};

export default selectors;
