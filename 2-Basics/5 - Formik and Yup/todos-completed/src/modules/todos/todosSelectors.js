import { createSelector } from "reselect";

const selectRaw = state => state.todos;

const selectItems = createSelector(
  [selectRaw],
  raw => raw.items
);

const selectCount = createSelector(
  [selectItems],
  items => items.length
);

const todosSelectors = {
  selectItems,
  selectCount
};

export default todosSelectors;
