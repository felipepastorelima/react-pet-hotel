const Roles = require('./roles');
const roles = Roles.values;

class Permissions {
  static get values() {
    return {
      iamEdit: {
        id: 'iamEdit',
        allowedRoles: [roles.manager, roles.employee],
        allowedStorageFolders: ['user'],
      },
      iamCreate: {
        id: 'iamCreate',
        allowedRoles: [roles.manager, roles.employee],
      },
      iamImport: {
        id: 'iamImport',
        allowedRoles: [
          roles.manager,
          roles.iamSecurityReviewer,
          roles.editor,
        ],
      },
      iamRead: {
        id: 'iamRead',
        allowedRoles: [roles.manager],
      },
      iamUserAutocomplete: {
        id: 'iamUserAutocomplete',
        allowedRoles: [roles.manager, roles.employee],
      },
      auditLogRead: {
        id: 'auditLogRead',
        allowedRoles: [roles.manager],
      },
      settingsEdit: {
        id: 'settingsEdit',
        allowedRoles: [roles.manager],
      },
      petImport: {
        id: 'petImport',
        allowedRoles: [roles.manager, roles.employee],
      },
      petCreate: {
        id: 'petCreate',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.petOwner,
        ],
        allowedStorageFolders: ['pet'],
      },
      petEdit: {
        id: 'petEdit',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.petOwner,
        ],
        allowedStorageFolders: ['pet'],
      },
      petDestroy: {
        id: 'petDestroy',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.petOwner,
        ],
        allowedStorageFolders: ['pet'],
      },
      petRead: {
        id: 'petRead',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.petOwner,
        ],
      },
      petAutocomplete: {
        id: 'petAutocomplete',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.petOwner,
        ],
      },

      bookingImport: {
        id: 'bookingImport',
        allowedRoles: [roles.manager],
      },
      bookingCreate: {
        id: 'bookingCreate',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.petOwner,
        ],
        allowedStorageFolders: ['booking'],
      },
      bookingEdit: {
        id: 'bookingEdit',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.petOwner,
        ],
        allowedStorageFolders: ['booking'],
      },
      bookingDestroy: {
        id: 'bookingDestroy',
        allowedRoles: [roles.manager],
        allowedStorageFolders: ['booking'],
      },
      bookingRead: {
        id: 'bookingRead',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.petOwner,
        ],
      },
      bookingAutocomplete: {
        id: 'bookingAutocomplete',
        allowedRoles: [
          roles.manager,
          roles.employee,
          roles.petOwner,
        ],
      },
    };
  }

  static get asArray() {
    return Object.keys(this.values).map((value) => {
      return this.values[value];
    });
  }
}

module.exports = Permissions;
