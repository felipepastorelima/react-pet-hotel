module.exports = function(sequelize, DataTypes) {
  const auditLog = sequelize.define(
    'auditLog',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      entityName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      entityId: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      action: {
        type: DataTypes.STRING(32),
        allowNull: false,
      },
      createdById: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      createdByEmail: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      timestamp: { type: DataTypes.DATE, allowNull: false },
      values: { type: DataTypes.JSON, allowNull: false },
    },
    {
      timestamps: false,
    },
  );

  auditLog.associate = (models) => {};

  return auditLog;
};
