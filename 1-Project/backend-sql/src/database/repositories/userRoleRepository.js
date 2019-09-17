const AbstractRepository = require('./abstractRepository');
const models = require('../models');
const SequelizeFilter = require('../utils/sequelizeFilter');

module.exports = class UserRoleRepository extends AbstractRepository {
  static async findAll({ filter, orderBy }) {
    let sequelizeFilter = new SequelizeFilter(
      models.Sequelize,
    );

    if (filter) {
      if (filter.role) {
        sequelizeFilter.appendEqual('role', filter.role);
      }
    }

    return models.userRole.findAll({
      where: sequelizeFilter.getWhere(),
      attributes: ['role'],
      group: 'role',
      order: orderBy
        ? [orderBy.split('_')]
        : [['role', 'ASC']],
    });
  }

  static async findAllWithUsers({ filter, orderBy }) {
    const rows = await this.findAll({ filter, orderBy });
    return Promise.all(
      rows.map(async (row) => {
        row.users = await this.findAllUsersByRole(row.role);
        return row;
      }),
    );
  }

  static async findAllUsersByRole(role, options) {
    return models.user.findAll(
      {
        include: [
          {
            model: models.userRole,
            as: 'roles',
            where: { role },
          },
        ],
      },
      { transaction: this.getTransaction(options) },
    );
  }

  static async findAllByUser(userId, options) {
    const userRoles = await models.userRole.findAll(
      {
        where: {
          userId,
        },
        raw: true,
      },
      { transaction: this.getTransaction(options) },
    );

    return userRoles.map((userRole) => userRole.role);
  }

  static async add(userId, roles, options) {
    for (const role of roles) {
      await models.userRole.findOrCreate({
        where: { userId: userId, role },
        defaults: {
          userId: userId,
          role,
          createdById: this.getCurrentUser(options).id,
          updatedById: this.getCurrentUser(options).id,
        },
        transaction: this.getTransaction(options),
      });
    }
  }

  static async refresh(userId, roles, options) {
    await models.userRole.destroy({
      where: {
        userId: userId,
        role: { [models.Sequelize.Op.notIn]: roles },
      },
      transaction: this.getTransaction(options),
    });

    for (const role of roles) {
      await models.userRole.findOrCreate({
        where: { userId: userId, role },
        defaults: {
          userId: userId,
          role,
          createdById: this.getCurrentUser(options).id,
          updatedById: this.getCurrentUser(options).id,
        },
        transaction: this.getTransaction(options),
      });
    }
  }

  static async remove(userId, roles, options) {
    await models.userRole.destroy({
      where: {
        userId: userId,
        role: { [models.Sequelize.Op.in]: roles },
      },
      transaction: this.getTransaction(options),
    });
  }
};
