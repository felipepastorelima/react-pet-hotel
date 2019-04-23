import { createSelector } from 'reselect';
import PermissionChecker from 'modules/auth/permissionChecker';
import Roles from 'security/roles';

const selectRaw = (state) => state.auth;

const selectAuthenticationUser = createSelector(
  [selectRaw],
  (auth) => auth.authenticationUser,
);

const selectCurrentUser = createSelector(
  [selectRaw],
  (auth) => auth.currentUser,
);

const selectCurrentUserEmail = createSelector(
  [selectCurrentUser],
  (currentUser) => (currentUser ? currentUser.email : null),
);

const selectCurrentUserFullName = createSelector(
  [selectCurrentUser],
  (currentUser) =>
    currentUser ? currentUser.fullName : '',
);

const selectSignedIn = createSelector(
  [selectCurrentUser],
  (currentUser) => !!currentUser && !!currentUser.id,
);

const selectRoles = createSelector(
  [selectCurrentUser],
  (currentUser) =>
    currentUser ? currentUser.roles || [] : [],
);

const selectEmptyPermissions = createSelector(
  [selectRoles],
  (roles) => !roles || !roles.length,
);

const selectLoading = createSelector(
  [selectRaw],
  (auth) => !!auth.loading,
);

const selectLoadingInit = createSelector(
  [selectRaw],
  (auth) => !!auth.loadingInit,
);

const selectLoadingEmailConfirmation = createSelector(
  [selectRaw],
  (auth) => !!auth.loadingEmailConfirmation,
);

const selectLoadingPasswordReset = createSelector(
  [selectRaw],
  (auth) => !!auth.loadingPasswordReset,
);

const selectLoadingUpdateProfile = createSelector(
  [selectRaw],
  (auth) => !!auth.loadingUpdateProfile,
);

const selectErrorMessage = createSelector(
  [selectRaw],
  (auth) => auth.errorMessage,
);

const selectCurrentUserNameOrEmailPrefix = createSelector(
  [selectCurrentUser, selectCurrentUserFullName],
  (currentUser, fullName) => {
    if (!currentUser) {
      return '';
    }

    if (fullName && fullName.length < 25) {
      return fullName;
    }

    if (currentUser.firstName) {
      return currentUser.firstName;
    }

    return currentUser.email.split('@')[0];
  },
);

const selectCurrentUserAvatar = createSelector(
  [selectCurrentUser],
  (currentUser) => {
    if (
      !currentUser ||
      !currentUser.avatars ||
      !currentUser.avatars.length ||
      !currentUser.avatars[0].publicUrl
    ) {
      return null;
    }

    return currentUser.avatars[0].publicUrl;
  },
);

const selectCurrentUserIsPetOwner = createSelector(
  [selectCurrentUser],
  (currentUser) => {
    return !new PermissionChecker(
      currentUser,
    ).rolesMatchOneOf([
      Roles.values.manager,
      Roles.values.employee,
    ]);
  },
);

const selectCurrentUserIsManager = createSelector(
  [selectCurrentUser],
  (currentUser) => {
    return new PermissionChecker(
      currentUser,
    ).rolesMatchOneOf(Roles.values.manager);
  },
);

const selectCurrentUserIsEmployee = createSelector(
  [selectCurrentUser, selectCurrentUserIsManager],
  (currentUser, isManager) => {
    const isEmployee = new PermissionChecker(
      currentUser,
    ).rolesMatchOneOf(Roles.values.employee);

    return isEmployee && !isManager;
  },
);

const selectRedirectToNewPet = createSelector(
  [selectRaw],
  (raw) => {
    return !!raw.redirectToNewPet;
  },
);

const selectors = {
  selectLoadingPasswordReset,
  selectLoadingEmailConfirmation,
  selectLoadingInit,
  selectLoadingUpdateProfile,
  selectLoading,
  selectEmptyPermissions,
  selectRoles,
  selectSignedIn,
  selectCurrentUserFullName,
  selectCurrentUserEmail,
  selectCurrentUser,
  selectAuthenticationUser: selectAuthenticationUser,
  selectErrorMessage,
  selectRaw,
  selectCurrentUserNameOrEmailPrefix,
  selectCurrentUserAvatar,
  selectCurrentUserIsPetOwner,
  selectCurrentUserIsManager,
  selectCurrentUserIsEmployee,
  selectRedirectToNewPet,
};

export default selectors;
