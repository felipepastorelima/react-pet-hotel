const assert = require('assert');
const ForbiddenError = require('../../errors/forbiddenError');

module.exports = class PermissionChecker {
  constructor({ language, currentUser }) {
    this.language = language;
    this.currentUser = currentUser;
  }

  validateHas(permission) {
    if (!this.has(permission)) {
      throw new ForbiddenError(this.language);
    }
  }

  has(permission) {
    assert(permission, 'permission is required');

    return this.currentUserRolesIds.some((role) =>
      permission.allowedRoles.some(
        (allowedRole) => allowedRole === role,
      ),
    );
  }

  get currentUserRolesIds() {
    if (!this.currentUser || !this.currentUser.roles) {
      return [];
    }

    return this.currentUser.roles;
  }
};
