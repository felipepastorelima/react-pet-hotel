const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const booking = sequelize.define(
    'booking',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      arrival: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      departure: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      clientNotes: {
        type: DataTypes.TEXT,
        validate: {

        }
      },
      employeeNotes: {
        type: DataTypes.TEXT,
        validate: {

        }
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [
          "booked",
          "progress",
          "cancelled",
          "completed"
        ],
      },
      cancellationNotes: {
        type: DataTypes.TEXT,
        validate: {

        }
      },
      fee: {
        type: DataTypes.DECIMAL(24, 2),
        validate: {

        }
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

  booking.associate = (models) => {
    models.booking.belongsTo(models.user, {
      as: 'owner',
      constraints: false,
    });

    models.booking.belongsTo(models.pet, {
      as: 'pet',
      constraints: false,
    });

    models.booking.hasMany(models.file, {
      as: 'photos',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.booking.getTableName(),
        belongsToColumn: 'photos',
      },
    });

    models.booking.hasMany(models.file, {
      as: 'receipt',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.booking.getTableName(),
        belongsToColumn: 'receipt',
      },
    });

    models.booking.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.booking.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return booking;
};
