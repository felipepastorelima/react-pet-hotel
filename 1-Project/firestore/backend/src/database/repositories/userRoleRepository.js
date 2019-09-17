const AbstractRepository = require('./abstractRepository');
const lodash = require('lodash');
const admin = require('firebase-admin');

module.exports = class UserRoleRepository extends AbstractRepository {
  static async findAllWithUsers({ filter, orderBy }) {
    const users = this.mapCollection(
      await admin
        .firestore()
        .collection(`user`)
        .get(),
    );

    const roles = [
      ...new Set(
        lodash.flatMap(users.map((user) => user.roles)),
      ),
    ];

    if (orderBy) {
      const [column, order] = orderBy.split('_');
      if (order === 'ASC') {
        roles.sort((a, b) => a.localeCompare(b));
      } else {
        roles.sort((a, b) => b.localeCompare(a));
      }
    }

    return roles.map((role) => ({
      role,
      users: users.filter((user) =>
        user.roles.includes(role),
      ),
    }));
  }

  static async findAllUsersByRole(role, options) {
    const users = this.mapCollection(
      await admin
        .firestore()
        .collection(`user`)
        .where('roles', 'array-contains', role)
        .get(),
    );

    return users;
  }

  static async findAllByUser(userId, options) {
    const user = await admin
      .firestore()
      .doc(`user/${userId}`)
      .get();

    return user.get('roles');
  }
};
