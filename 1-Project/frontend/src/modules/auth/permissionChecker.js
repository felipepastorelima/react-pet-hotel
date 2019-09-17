export default class PermissionChecker {
  constructor(currentUser) {
    this.currentUser = currentUser;
    this.userRoles = currentUser ? currentUser.roles : [];
  }

  match(permission) {
    if (!permission) {
      return true;
    }

    return this.rolesMatchOneOf(permission.allowedRoles);
  }

  rolesMatchOneOf(arg) {
    if (!this.userRoles) {
      return false;
    }

    if (!arg) {
      return false;
    }

    if (Array.isArray(arg)) {
      if (!arg.length) {
        return false;
      }

      return arg.some((role) =>
        this.userRoles.includes(role),
      );
    }

    return this.userRoles.includes(arg);
  }

  get isEmptyPermissions() {
    if (!this.isAuthenticated) {
      return false;
    }

    return !this.userRoles || !this.userRoles.length;
  }

  get isAuthenticated() {
    return !!this.currentUser && !!this.currentUser.id;
  }

  get isEmailVerified() {
    if (!this.isAuthenticated) {
      return false;
    }

    return this.currentUser.emailVerified;
  }
}
