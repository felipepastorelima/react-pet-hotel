import paginationSelectors from 'modules/shared/pagination/paginationSelectors';
import { createSelector } from 'reselect';

const unlimited = true;

const basePaginationSelectors = paginationSelectors(
  'iam.list.roles',
  unlimited,
);

const selectRowsAsTree = createSelector(
  [basePaginationSelectors.selectRows],
  (rows) => {
    return rows.map((row) => {
      return {
        id: row.role,
        type: 'role',
        role: row.role,
        fullName: null,
        children: row.users.map((user) => ({
          id: `${row.role}-${user.id}`,
          type: 'user',
          userId: user.id,
          email: user.email,
          fullName: user.fullName,
          disabled: user.disabled,
          role: row.role,
        })),
      };
    });
  },
);

const selectSelectedChildren = createSelector(
  [
    selectRowsAsTree,
    basePaginationSelectors.selectSelectedKeys,
  ],
  (tree, selectedKeys) => {
    const selectedChildren = [];

    tree.forEach((item) => {
      item.children
        .filter((child) => selectedKeys.includes(child.id))
        .forEach((selectedChild) => {
          selectedChildren.push(selectedChild);
        });
    });

    return selectedChildren;
  },
);

const selectors = {
  ...basePaginationSelectors,
  selectRowsAsTree,
  selectSelectedChildren,
};
export default selectors;
