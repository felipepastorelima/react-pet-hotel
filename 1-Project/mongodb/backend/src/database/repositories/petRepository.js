const AbstractEntityRepository = require('./abstractEntityRepository');
const MongooseQuery = require('../utils/mongooseQuery');
const Pet = require('../models/pet');
const Booking = require('../models/booking');

class PetRepository extends AbstractEntityRepository {
  constructor() {
    super(Pet);
  }

  async refreshTwoWayRelations(record, options) {
    await this.refreshTwoWayRelationManyToOne(
      record,
      Pet,
      'bookings',
      Booking,
      'pet',
      options,
    );
  }

  async destroyFromRelations(id, options) {
    await this.destroyRelationToOne(
      id,
      Booking,
      'pet',
      options,
    );
  }

  async findById(id, options) {
    return this.wrapWithSessionIfExists(
      Pet.findById(id)
      .populate('owner')
      .populate('bookings'),
      options,
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
    const query = MongooseQuery.forList({
      limit,
      offset,
      orderBy: orderBy || 'createdAt_DESC',
    });

    if (filter) {
      if (filter.id) {
        query.appendId('_id', filter.id);
      }

      if (filter.owner) {
        query.appendId('owner', filter.owner);
      }

      if (filter.name) {
        query.appendIlike('name', filter.name);
      }

      if (filter.type) {
        query.appendEqual('type', filter.type);
      }

      if (filter.breed) {
        query.appendIlike('breed', filter.breed);
      }

      if (filter.size) {
        query.appendEqual('size', filter.size);
      }

      if (filter.createdAtRange) {
        query.appendRange(
          'createdAt',
          filter.createdAtRange,
        );
      }
    }

    const rows = await Pet.find(query.criteria)
      .skip(query.skip)
      .limit(query.limit)
      .sort(query.sort)
      .populate('owner')
      .populate('bookings');

    const count = await Pet.countDocuments(query.criteria);

    return { rows, count };
  }

  async findAllAutocomplete(search, limit) {
    let query = MongooseQuery.forAutocomplete({
      limit,
      orderBy: 'name_ASC',
    });

    if (search) {
      query.appendId('_id', search);
      query.appendIlike('name', search);
    }

    const records = await Pet.find(query.criteria)
      .limit(query.limit)
      .sort(query.sort);

    return records.map((record) => ({
      id: record.id,
      label: record['name'],
    }));
  }
}

module.exports = PetRepository;
