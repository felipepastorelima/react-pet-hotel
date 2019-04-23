import { createSelector } from 'reselect';
import authSelectors from 'modules/auth/authSelectors';
import PermissionChecker from 'modules/auth/permissionChecker';
import Permissions from 'security/permissions';
import Roles from 'security/roles';

const selectPermissionToRead = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.iamRead,
    ),
);

const selectPermissionToEdit = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.iamEdit,
    ),
);

const selectPermissionToCreate = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.iamCreate,
    ),
);

const selectPermissionToImport = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.iamImport,
    ),
);

const selectPermissionToRemove = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.iamRemove,
    ),
);

const selectPermissionToChangeStatus = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.iamChangeStatus,
    ),
);

const selectPermissionToEditRecord = createSelector(
  [
    selectPermissionToEdit,
    authSelectors.selectCurrentUserIsManager,
  ],
  (hasPermissionToEdit, isManager) => {
    return (record) => {
      if (!record) {
        return false;
      }

      if (!hasPermissionToEdit) {
        return false;
      }

      if (isManager) {
        return true;
      }

      if (
        record.role &&
        record.role === Roles.values.petOwner
      ) {
        return true;
      }

      if (!record.roles || record.roles.length !== 1) {
        return false;
      }

      return record.roles[0] === Roles.values.petOwner;
    };
  },
);

const selectors = {
  selectPermissionToRead,
  selectPermissionToEdit,
  selectPermissionToCreate,
  selectPermissionToImport,
  selectPermissionToRemove,
  selectPermissionToChangeStatus,
  selectPermissionToEditRecord,
};

export default selectors;
