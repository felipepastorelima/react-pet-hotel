module.exports = function(sequelize, DataTypes) {
  const settings = sequelize.define(
    'settings',
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: 'default',
        primaryKey: true,
      },
      theme: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
  );

  settings.associate = (models) => {
    models.settings.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.settings.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return settings;
};
