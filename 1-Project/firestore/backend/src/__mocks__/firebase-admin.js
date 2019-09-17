const generateFirebaseUsers = () => {
  return [
    {
      uid: '1',
      displayName: 'John Doe',
      email: 'john@test.test',
    },
    {
      uid: '2',
      displayName: 'Jack Doe',
      email: 'jackdoe@test.test',
    },
    {
      uid: '3',
      displayName: 'Mark Doe',
      email: 'mark@test.test',
    },
  ];
};

let _currentUserUid = '1';
let _firebaseUsers = generateFirebaseUsers();

function _reset() {
  _currentUserUid = '1';
  _firebaseUsers = generateFirebaseUsers();
}

function _getUser(uid) {
  return _firebaseUsers.find(
    (firebaseUser) => firebaseUser.uid === uid,
  );
}

function _getCurrentUser() {
  return _getUser(_currentUserUid);
}

module.exports = {
  _reset() {
    _reset();
  },

  _getUser: (uid) => {
    return _getUser(uid);
  },

  _getCurrentUser: () => {
    return _getCurrentUser();
  },

  initializeApp: () => {},

  credential: {
    cert: () => {},
  },

  auth: () => {
    return {
      updateUser(uid, profile) {
        const user = _getUser(uid);
        Object.assign(user, profile);
        return Promise.resolve(user);
      },
      getUser(uid) {
        return Promise.resolve(_getUser(uid));
      },
      getUserByEmail() {
        return Promise.resolve(_getCurrentUser());
      },
      verifyIdToken(token) {
        return Promise.resolve(_getUser(token));
      },
      generateEmailVerificationLink() {
        return Promise.resolve('https://mock-link.com');
      },
      generatePasswordResetLink() {
        return Promise.resolve('https://mock-link.com');
      },
      createCustomToken(uid, metadata) {
        return Object.keys(metadata).join(',');
      },
    };
  },
};
