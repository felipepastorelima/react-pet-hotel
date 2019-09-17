const AbstractRepository = require('./abstractRepository');
const User = require('../models/user');
const MongooseQuery = require('../utils/mongooseQuery');
const lodash = require('lodash');

module.exports = class UserRoleRepository extends AbstractRepository {
  static async findAllWithUsers({ filter, orderBy }) {
    const query = MongooseQuery.forList({
      orderBy,
    });

    if (filter && filter.role) {
      query.appendIn('roles', filter.role);
    }

    const users = await User.find(query.criteria);

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
    return this.wrapWithSessionIfExists(
      User.find({ roles: role }),
      options,
    );
  }

  static async findAllByUser(userId, options) {
    const user = await this.wrapWithSessionIfExists(
      User.findById(userId),
      options,
    );
    return user.roles;
  }
};
