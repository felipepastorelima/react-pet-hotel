import { createSelector } from 'reselect';
import authSelectors from 'modules/auth/authSelectors';
import PermissionChecker from 'modules/auth/permissionChecker';
import Permissions from 'security/permissions';
import bookingStatus from 'modules/booking/bookingStatus';

const selectPermissionToRead = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.bookingRead,
    ),
);

const selectPermissionToEdit = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.bookingEdit,
    ),
);

const selectPermissionToEditRecord = createSelector(
  [
    selectPermissionToEdit,
    authSelectors.selectCurrentUserIsPetOwner,
  ],
  (hasPermissionToEdit, isPetOwner) => {
    return (record) => {
      if (!hasPermissionToEdit) {
        return false;
      }

      if (!record) {
        return false;
      }

      if (isPetOwner) {
        return record.status === bookingStatus.BOOKED;
      }

      return true;
    };
  },
);

const selectPermissionToCreate = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.bookingCreate,
    ),
);

const selectPermissionToImport = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.bookingImport,
    ),
);

const selectPermissionToDestroy = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) =>
    new PermissionChecker(currentUser).match(
      Permissions.values.bookingDestroy,
    ),
);

const selectors = {
  selectPermissionToRead,
  selectPermissionToEdit,
  selectPermissionToCreate,
  selectPermissionToDestroy,
  selectPermissionToImport,
  selectPermissionToEditRecord,
};

export default selectors;
