class Roles {
  static get values() {
    return {
      owner: 'owner',
      editor: 'editor',
      viewer: 'viewer',
      auditLogViewer: 'auditLogViewer',
      iamSecurityReviewer: 'iamSecurityReviewer',
      entityEditor: 'entityEditor',
      entityViewer: 'entityViewer',
      petEditor: 'petEditor',
      petViewer: 'petViewer',
      bookingEditor: 'bookingEditor',
      bookingViewer: 'bookingViewer',
    };
  }
}

module.exports = Roles;
