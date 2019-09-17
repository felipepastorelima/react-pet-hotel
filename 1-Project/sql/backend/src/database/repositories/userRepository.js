const AbstractRepository = require('./abstractRepository');
const models = require('../models');
const UserRoleRepository = require('./userRoleRepository');
const FileRepository = require('./fileRepository');
const AuditLogRepository = require('./auditLogRepository');
const SequelizeFilter = require('../utils/sequelizeFilter');
const SequelizeAutocompleteFilter = require('../utils/sequelizeAutocompleteFilter');

module.exports = class UserRepository extends AbstractRepository {
  static async create(data, options) {
    const user = await models.user.create(
      {
        id: data.id || undefined,
        email: data.email,
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        authenticationUid: data.authenticationUid || null,
        phoneNumber: data.phoneNumber || null,
        importHash: data.importHash || null,
        createdById: this.getCurrentUser(options).id,
        updatedById: this.getCurrentUser(options).id,
      },
      { transaction: this.getTransaction(options) },
    );

    await FileRepository.replaceRelationFiles(
      {
        belongsTo: models.user.getTableName(),
        belongsToColumn: 'avatars',
        belongsToId: user.id,
      },
      data.avatars,
      options,
    );

    await UserRoleRepository.add(
      user.id,
      data.roles || [],
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: {
          ...user.get({ plain: true }),
          avatars: data.avatars,
          roles: await UserRoleRepository.findAllByUser(
            user.id,
          ),
        },
      },
      options,
    );

    return this.findById(user.id, options);
  }

  static async createFromAuth(data, options) {
    const user = await models.user.create(
      {
        email: data.email,
        firstName: data.firstName,
        authenticationUid: data.authenticationUid,
      },
      { transaction: this.getTransaction(options) },
    );

    await UserRoleRepository.add(
      user.id,
      data.roles || [],
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: {
          ...user.get({ plain: true }),
          avatars: data.avatars,
          roles: await UserRoleRepository.findAllByUser(
            user.id,
          ),
        },
      },
      options,
    );

    return this.findById(user.id, options);
  }

  static async updateProfile(id, data, options) {
    const user = await models.user.findByPk(id, {
      transaction: this.getTransaction(options),
    });

    await user.update(
      {
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        phoneNumber: data.phoneNumber || null,
        updatedById: this.getCurrentUser(options).id,
      },
      { transaction: this.getTransaction(options) },
    );

    await FileRepository.replaceRelationFiles(
      {
        belongsTo: models.user.getTableName(),
        belongsToColumn: 'avatars',
        belongsToId: user.id,
      },
      data.avatars,
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          ...user.get({ plain: true }),
          avatars: data.avatars,
          roles: await UserRoleRepository.findAllByUser(
            user.id,
            options,
          ),
        },
      },
      options,
    );

    return this.findById(user.id, options);
  }

  static async updateAuthenticationUid(
    id,
    authenticationUid,
    options,
  ) {
    const user = await models.user.findByPk(id, {
      transaction: this.getTransaction(options),
    });

    await user.update(
      {
        authenticationUid,
        updatedById: this.getCurrentUser(options).id,
      },
      { transaction: this.getTransaction(options) },
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          authenticationUid,
        },
      },
      options,
    );

    return this.findById(user.id, options);
  }

  static async updateStatus(id, disabled, options) {
    const user = await models.user.findByPk(id, {
      transaction: this.getTransaction(options),
    });

    await user.update(
      {
        disabled,
        updatedById: this.getCurrentUser(options).id,
      },
      { transaction: this.getTransaction(options) },
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          disabled,
        },
      },
      options,
    );

    return this.findById(user.id, options);
  }

  static async updateRoles(id, roles, options) {
    const user = await models.user.findByPk(id, {
      transaction: this.getTransaction(options),
    });

    if (options.addRoles) {
      await UserRoleRepository.add(
        user.id,
        roles || [],
        options,
      );
    } else if (options.removeOnlyInformedRoles) {
      await UserRoleRepository.remove(
        user.id,
        roles || [],
        options,
      );
    } else {
      await UserRoleRepository.refresh(
        user.id,
        roles || [],
        options,
      );
    }

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          roles: await UserRoleRepository.findAllByUser(
            user.id,
            options,
          ),
        },
      },
      options,
    );

    return this.findById(user.id, options);
  }

  static async update(id, data, options) {
    const user = await models.user.findByPk(id, {
      transaction: this.getTransaction(options),
    });

    await user.update(
      {
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        phoneNumber: data.phoneNumber || null,
        updatedById: this.getCurrentUser(options).id,
      },
      { transaction: this.getTransaction(options) },
    );

    await FileRepository.replaceRelationFiles(
      {
        belongsTo: models.user.getTableName(),
        belongsToColumn: 'avatars',
        belongsToId: user.id,
      },
      data.avatars,
      options,
    );

    await UserRoleRepository.refresh(
      user.id,
      data.roles || [],
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          ...user.get({ plain: true }),
          avatars: data.avatars,
          roles: await UserRoleRepository.findAllByUser(
            user.id,
            options,
          ),
        },
      },
      options,
    );

    return this.findById(user.id, options);
  }

  static async findByEmail(email, options) {
    const record = await models.user.findOne(
      { where: { email } },
      { transaction: this.getTransaction(options) },
    );

    return this._fillNonTableAttributesForRecord(
      record,
      null,
      options,
    );
  }

  static async findByEmailWithoutAvatar(email, options) {
    const record = await models.user.findOne(
      { where: { email } },
      { transaction: this.getTransaction(options) },
    );

    return this._fillNonTableAttributesForRecord(
      record,
      ['roles'],
      options,
    );
  }

  static async findAllWithCount(
    { filter, limit, offset, orderBy, attributes } = {
      attributes: null,
      filter: null,
      limit: 0,
      offset: 0,
      orderBy: null,
    },
    options,
  ) {
    let sequelizeFilter = new SequelizeFilter(
      models.Sequelize,
    );

    if (filter) {
      if (filter.id) {
        sequelizeFilter.appendId('id', filter.id);
      }

      if (filter.fullName) {
        sequelizeFilter.appendIlike(
          'fullName',
          filter.fullName,
          'user',
        );
      }

      if (filter.email) {
        sequelizeFilter.appendIlike(
          'email',
          filter.email,
          'user',
        );
      }

      if (filter.role) {
        sequelizeFilter.appendRelationWithEqual(
          models.userRole,
          'roles',
          'role',
          filter.role,
        );
      }

      if (filter.status) {
        const disabled = filter.status === 'disabled';
        sequelizeFilter.appendEqual('disabled', disabled);
      }

      if (filter.createdAtRange) {
        sequelizeFilter.appendRange(
          'createdAt',
          filter.createdAtRange,
        );
      }
    }

    let { rows, count } = await models.user.findAndCountAll(
      {
        attributes: attributes || undefined,
        where: sequelizeFilter.getWhere(),
        include: sequelizeFilter.getInclude(),
        limit: limit ? limit : undefined,
        offset: offset || undefined,
        order: orderBy
          ? [orderBy.split('_')]
          : [['createdAt', 'DESC']],
        transaction: this.getTransaction(options),
      },
    );

    rows = await this._fillNonTableAttributesForRows(
      rows,
      attributes,
      options,
    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    const filter = new SequelizeAutocompleteFilter(
      models.Sequelize,
    );

    if (query) {
      filter.appendId('id', query);
      filter.appendIlike('fullName', query, 'user');
      filter.appendIlike('email', query, 'user');
    }

    const users = await models.user.findAll({
      attributes: ['id', 'fullName', 'email'],
      where: filter.getWhere(),
      limit: limit || undefined,
      orderBy: [['fullName', 'ASC']],
    });

    const buildText = (user) => {
      if (!user.fullName) {
        return user.email;
      }

      return `${user.fullName} <${user.email}>`;
    };

    return users.map((user) => ({
      id: user.id,
      label: buildText(user),
    }));
  }

  static async findById(id, options) {
    const record = await models.user.findByPk(id, {
      transaction: this.getTransaction(options),
    });

    return this._fillNonTableAttributesForRecord(
      record,
      null,
      options,
    );
  }

  static async findByIdWithoutAvatar(id, options) {
    const record = await models.user.findByPk(id, {
      transaction: this.getTransaction(options),
    });

    return this._fillNonTableAttributesForRecord(
      record,
      ['roles'],
      options,
    );
  }

  static async findAllByDisabled(ids, disabled, options) {
    const users = await models.user.findAll({
      where: {
        id: {
          [models.Sequelize.Op.in]: ids,
        },
        disabled: !!disabled,
      },
      transaction: this.getTransaction(options),
    });

    return users;
  }

  static async count(filter, options) {
    return models.user.count(
      {
        where: filter,
      },
      { transaction: this.getTransaction(options) },
    );
  }

  static async _fillNonTableAttributesForRows(
    rows,
    requestedAttributes,
    options,
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillNonTableAttributesForRecord(
          record,
          requestedAttributes,
          options,
        ),
      ),
    );
  }

  static async _fillNonTableAttributesForRecord(
    record,
    requestedAttributes,
    options,
  ) {
    if (!record) {
      return record;
    }

    function isRequestedAttribute(attribute) {
      if (
        !requestedAttributes ||
        requestedAttributes.length
      ) {
        return true;
      }

      return requestedAttributes.includes(attribute);
    }

    const output = record.get({ plain: true });

    if (isRequestedAttribute('avatars')) {
      output.avatars = await record.getAvatars({
        transaction: AbstractRepository.getTransaction(
          options,
        ),
      });
    }

    if (isRequestedAttribute('roles')) {
      output.roles = await UserRoleRepository.findAllByUser(
        record.id,
        options,
      );
    }

    return output;
  }
};
