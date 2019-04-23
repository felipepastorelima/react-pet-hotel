const models = require('../models');
const SequelizeFilter = require('../utils/sequelizeFilter');
const SequelizeAutocompleteFilter = require('../utils/sequelizeAutocompleteFilter');
const AbstractEntityRepository = require('./abstractEntityRepository');

class PetRepository extends AbstractEntityRepository {
  constructor() {
    const modelName = 'pet';

    const inTableAttributes = [
      'id',
      'name',
      'type',
      'breed',
      'size',
      'importHash',
      'updatedAt',
      'createdAt',
    ];

    const fileAttributes = [];

    const relationToOneAttributes = {
      owner: {
        model: models.user,
        as: 'owner',
      },
    };

    const relationToManyAttributes = {
      bookings: {
        model: models.booking,
        as: 'bookings',
      },
    };

    super(
      modelName,
      inTableAttributes,
      relationToOneAttributes,
      relationToManyAttributes,
      fileAttributes,
    );
  }

  async findAndCountAll(
    {
      requestedAttributes,
      filter,
      limit,
      offset,
      orderBy,
    } = {
      requestedAttributes: null,
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

      if (filter.owner) {
        sequelizeFilter.appendId('ownerId', filter.owner);
      }

      if (filter.name) {
        sequelizeFilter.appendIlike(
          'name',
          filter.name,
          this.modelName,
        );
      }

      if (filter.type) {
        sequelizeFilter.appendEqual('type', filter.type);
      }

      if (filter.breed) {
        sequelizeFilter.appendIlike(
          'breed',
          filter.breed,
          this.modelName,
        );
      }

      if (filter.size) {
        sequelizeFilter.appendEqual('size', filter.size);
      }

      if (filter.createdAtRange) {
        sequelizeFilter.appendRange(
          'createdAt',
          filter.createdAtRange,
        );
      }
    }

    return super.findAndCountAllGeneric(
      {
        requestedAttributes,
        sequelizeFilter,
        limit,
        offset,
        orderBy,
      },
      options,
    );
  }

  async findAllAutocomplete(filter, limit) {
    const sequelizeFilter = new SequelizeAutocompleteFilter(
      models.Sequelize,
    );

    if (filter && filter.query) {
      sequelizeFilter.appendId('id', filter.query);
      sequelizeFilter.appendIlike(
        'name',
        filter.query,
        this.modelName,
      );
    }

    let where = sequelizeFilter.getWhere();

    if (filter && filter.owner) {
      where = {
        ...where,
        [models.Sequelize.Op.and]: {
          ownerId: filter.owner,
        },
      };
    }

    const records = await models[this.modelName].findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit || undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
}

module.exports = PetRepository;
