const Permissions = require('../security/permissions');
const PermissionChecker = require('../services/iam/permissionChecker');
const AuthService = require('../auth/authService');

module.exports = class StorageTokenGenerator {
  constructor({ language, currentUser }) {
    this.currentUser = currentUser;
    this.permissionChecker = new PermissionChecker({
      language,
      currentUser,
    });
  }

  generateStorageToken() {
    const metadata = {};

    this._allowedStorageFolders().forEach(
      (allowedStorageFolder) => {
        metadata[allowedStorageFolder] = true;
      },
    );

    return AuthService.createCustomToken(
      this.currentUser.authenticationUid,
      metadata,
    );
  }

  _allowedStorageFolders() {
    let allowedStorageFolders = [];

    Permissions.asArray.forEach((permission) => {
      if (this.permissionChecker.has(permission)) {
        allowedStorageFolders = allowedStorageFolders.concat(
          permission.allowedStorageFolders || [],
        );
      }
    });

    return [...new Set(allowedStorageFolders)];
  }
};
