import { createSelector } from 'reselect';
import paginationSelectors from 'modules/shared/pagination/paginationSelectors';
import authSelectors from 'modules/auth/authSelectors';
import PermissionChecker from 'modules/auth/permissionChecker';
import Permissions from 'security/permissions';

const selectPermissionToRead = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.auditLogRead,
    ),
);

export default {
  ...paginationSelectors('auditLog'),
  selectPermissionToRead,
};
