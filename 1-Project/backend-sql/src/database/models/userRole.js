module.exports = function(sequelize, DataTypes) {
  const userRole = sequelize.define(
    'userRole',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  userRole.associate = (models) => {
    models.userRole.belongsTo(models.user);

    models.userRole.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.userRole.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return userRole;
};
