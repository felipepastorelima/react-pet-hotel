const AbstractRepository = require('./abstractRepository');
const AuditLogRepository = require('./auditLogRepository');
const admin = require('firebase-admin');
const lodash = require('lodash');
const FirebaseQuery = require('../utils/firebaseQuery');
const User = require('../models/user');

module.exports = class UserRepository extends AbstractRepository {
  static async create(data, options) {
    data = this._preSave(data);
    data = new User().cast(data);

    const user = {
      id: this.newId(),
      ...data,
      createdBy: this.getCurrentUser(options).id,
      createdAt: this.serverTimestamp(),
      updatedBy: this.getCurrentUser(options).id,
      updatedAt: this.serverTimestamp(),
    };

    await this.executeOrAddToBatch(
      'set',
      admin.firestore().doc(`user/${user.id}`),
      user,
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return user;
  }

  static async createFromAuth(data, options) {
    data = this._preSave(data);
    data = new User().cast(data);

    const user = {
      id: this.newId(),
      email: data.email,
      firstName: data.firstName,
      fullName: data.fullName,
      authenticationUid: data.authenticationUid,
      roles: data.roles || [],
      disabled: false,
      createdAt: this.serverTimestamp(),
      updatedAt: this.serverTimestamp(),
    };

    await this.executeOrAddToBatch(
      'set',
      admin.firestore().doc(`user/${user.id}`),
      user,
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.CREATE,
        values: user,
      },
      options,
    );

    return user;
  }

  static async updateProfile(id, data, options) {
    data = this._preSave(data);
    data = new User().cast(data);

    const user = {
      id,
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      fullName: data.fullName || null,
      phoneNumber: data.phoneNumber || null,
      avatars: data.avatars || [],
      updatedBy: this.getCurrentUser(options).id,
      updatedAt: this.serverTimestamp(),
    };

    await this.executeOrAddToBatch(
      'update',
      admin.firestore().doc(`user/${user.id}`),
      user,
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: user,
      },
      options,
    );

    return user;
  }

  static async updateAuthenticationUid(
    id,
    authenticationUid,
    options,
  ) {
    const user = {
      id,
      authenticationUid,
      updatedBy: this.getCurrentUser(options).id,
      updatedAt: this.serverTimestamp(),
    };

    await this.executeOrAddToBatch(
      'update',
      admin.firestore().doc(`user/${user.id}`),
      user,
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          authenticationUid,
        },
      },
      options,
    );

    return user;
  }

  static async updateStatus(id, disabled, options) {
    const user = {
      id,
      disabled,
      updatedBy: this.getCurrentUser(options).id,
      updatedAt: this.serverTimestamp(),
    };

    await this.executeOrAddToBatch(
      'update',
      admin.firestore().doc(`user/${user.id}`),
      user,
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: {
          id,
          disabled,
        },
      },
      options,
    );

    return user;
  }

  static async updateRoles(id, roles, options) {
    const user = await this.findById(id);

    if (options.addRoles) {
      user.roles = [...user.roles, ...roles];
    } else if (options.removeOnlyInformedRoles) {
      user.roles = lodash.difference(user.roles, roles);
    } else {
      user.roles = roles;
    }

    await this.executeOrAddToBatch(
      'update',
      admin.firestore().doc(`user/${id}`),
      {
        roles: user.roles,
      },
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: user.id,
        action: AuditLogRepository.UPDATE,
        values: {
          roles: user.roles,
        },
      },
      options,
    );

    return user;
  }

  static async update(id, data, options) {
    data = this._preSave(data);
    data = new User().cast(data);

    const user = {
      id,
      firstName: data.firstName || null,
      lastName: data.lastName || null,
      fullName: data.fullName || null,
      phoneNumber: data.phoneNumber || null,
      avatars: data.avatars || [],
      roles: data.roles || [],
      updatedBy: this.getCurrentUser(options).id,
      updatedAt: this.serverTimestamp(),
    };

    await this.executeOrAddToBatch(
      'update',
      admin.firestore().doc(`user/${user.id}`),
      user,
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'user',
        entityId: id,
        action: AuditLogRepository.UPDATE,
        values: user,
      },
      options,
    );

    return user;
  }

  static async findByEmail(email, options) {
    const collection = await admin
      .firestore()
      .collection(`user`)
      .where('email', '==', email)
      .limit(1)
      .get();

    const users = this.mapCollection(collection);

    if (users.length) {
      return users[0];
    }

    return null;
  }

  static async findByEmailWithoutAvatar(email, options) {
    return this.findByEmail(email, options);
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
    const query = FirebaseQuery.forList({
      limit,
      offset,
      orderBy: orderBy || 'createdAt_DESC',
    });

    if (filter) {
      if (filter.id) {
        query.appendId('id', filter.id);
      }

      if (filter.fullName) {
        query.appendIlike('fullName', filter.fullName);
      }

      if (filter.email) {
        query.appendIlike('email', filter.email);
      }

      if (filter.role) {
        query.appendIn('roles', filter.role);
      }

      if (filter.status) {
        const disabled = filter.status === 'disabled';
        query.appendEqual('disabled', disabled);
      }

      if (filter.createdAtRange) {
        query.appendRange(
          'createdAt',
          filter.createdAtRange,
        );
      }
    }

    const collection = await admin
      .firestore()
      .collection(`user`)
      .get();

    const all = this.mapCollection(collection);
    const rows = query.rows(all);
    const count = query.count(all);

    return { rows, count };
  }

  static async findAllAutocomplete(search, limit) {
    const query = FirebaseQuery.forAutocomplete({
      limit,
      orderBy: 'fullName_ASC',
    });

    if (search) {
      query.appendId('id', search);
      query.appendIlike('fullName', search);
      query.appendIlike('email', search);
    }

    const collection = await admin
      .firestore()
      .collection(`user`)
      .get();

    const all = this.mapCollection(collection);
    const rows = query.rows(all);

    const buildText = (user) => {
      if (!user.fullName) {
        return user.email;
      }

      return `${user.fullName} <${user.email}>`;
    };

    return rows.map((user) => ({
      id: user.id,
      label: buildText(user),
    }));
  }

  static async findById(id) {
    return this.findDocument('user', id);
  }

  static async findByIdWithoutAvatar(id) {
    return this.findById(id);
  }

  static async findAllByDisabled(ids, disabled) {
    const users = await this.findDocuments('user', ids);

    return users.filter(
      (user) => !!user.disabled === !!disabled,
    );
  }

  static async count(filter, options) {
    let chain = admin.firestore().collection('user');

    if (filter) {
      Object.keys(filter).forEach((key) => {
        chain = chain.where(key, '==', filter[key]);
      });
    }

    return (await chain.get()).size;
  }

  static _preSave(data) {
    if (data.firstName || data.lastName) {
      data.fullName = `${(data.firstName || '').trim()} ${(
        data.lastName || ''
      ).trim()}`.trim();
    }

    data.email = data.email ? data.email.trim() : null;

    data.firstName = data.firstName
      ? data.firstName.trim()
      : null;

    data.lastName = data.lastName
      ? data.lastName.trim()
      : null;

    return data;
  }
};
