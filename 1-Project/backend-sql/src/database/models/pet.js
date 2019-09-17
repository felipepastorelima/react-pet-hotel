const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  const pet = sequelize.define(
    'pet',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      type: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [
          "cat",
          "dog"
        ],
      },
      breed: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      size: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [
          "small",
          "medium",
          "large"
        ],
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

  pet.associate = (models) => {
    models.pet.belongsTo(models.user, {
      as: 'owner',
      constraints: false,
    });

    models.pet.hasMany(models.booking, {
      as: 'bookings',
      constraints: false,
      foreignKey: 'petId',
    });



    models.pet.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.pet.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return pet;
};
