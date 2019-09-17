import { createSelector } from 'reselect';

const selectRaw = (state) => state.layout;

const selectMenuVisible = createSelector(
  [selectRaw],
  (layout) => !!layout.menuVisible,
);

const selectLoading = createSelector(
  [selectRaw],
  (layout) => !!layout.loading,
);

const selectLanguage = createSelector(
  [selectRaw],
  (layout) => layout.language,
);

const selectors = {
  selectRaw,
  selectMenuVisible,
  selectLoading,
  selectLanguage,
};

export default selectors;
