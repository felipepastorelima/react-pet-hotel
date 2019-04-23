const bookingStatus = require('../../enumerators/bookingStatus');

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
          max: 20000,
        },
      },
      employeeNotes: {
        type: DataTypes.TEXT,
        validate: {
          max: 20000,
        },
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [
          bookingStatus.BOOKED,
          bookingStatus.CANCELLED,
          bookingStatus.COMPLETED,
          bookingStatus.PROGRESS,
        ],
      },
      cancellationNotes: {
        type: DataTypes.TEXT,
        validate: {
          max: 20000,
        },
      },
      fee: {
        type: DataTypes.DECIMAL(24, 2),
        validate: {},
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
