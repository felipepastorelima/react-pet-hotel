module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define(
    'user',
    {
      id: {
        type: DataTypes.STRING(255),
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      firstName: {
        type: DataTypes.STRING(80),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(175),
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING(24),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      authenticationUid: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  user.associate = (models) => {
    models.user.hasMany(models.userRole, {
      as: 'roles',
    });

    models.user.hasMany(models.file, {
      as: { singular: 'avatar', plural: 'avatars' },
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.user.getTableName(),
        belongsToColumn: 'avatars',
      },
    });

    models.user.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.user.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  user.beforeCreate((user, options) => {
    user = trimStringFields(user);
    user.fullName = buildFullName(
      user.firstName,
      user.lastName,
    );
  });

  user.beforeUpdate((user, options) => {
    user = trimStringFields(user);
    user.fullName = buildFullName(
      user.firstName,
      user.lastName,
    );
  });

  return user;
};

function buildFullName(firstName, lastName) {
  if (!firstName && !lastName) {
    return null;
  }

  return `${(firstName || '').trim()} ${(
    lastName || ''
  ).trim()}`.trim();
}

function trimStringFields(user) {
  user.email = user.email.trim();

  user.firstName = user.firstName
    ? user.firstName.trim()
    : null;

  user.lastName = user.lastName
    ? user.lastName.trim()
    : null;

  return user;
}
