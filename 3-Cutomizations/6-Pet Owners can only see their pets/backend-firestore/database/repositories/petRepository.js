const AbstractEntityRepository = require('./abstractEntityRepository');
const admin = require('firebase-admin');
const FirebaseQuery = require('../utils/firebaseQuery');
const Pet = require('../models/pet');

class PetRepository extends AbstractEntityRepository {
  constructor() {
    super(new Pet());
  }

  async refreshTwoWayRelations(record, options) {
    await this.refreshTwoWayRelationManyToOne(
      record,
      'pet',
      'bookings',
      'booking',
      'pet',
      options,
    );
  }

  async destroyFromRelations(id, options) {
    await this.destroyRelationToOne(
      id,
      'booking',
      'pet',
      options,
    );
  }

  async findById(id) {
    const record = await this.findDocument('pet', id);
    return this.populate(record);
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

    const collection = await admin
      .firestore()
      .collection(`pet`)
      .get();

    const all = this.mapCollection(collection);
    const rows = await this.populateAll(query.rows(all));
    const count = query.count(all);

    return { rows, count };
  }

  async findAllAutocomplete(filter, limit) {
    const firebaseQuery = FirebaseQuery.forAutocomplete({
      limit,
      orderBy: 'name_ASC',
    });

    if (filter && filter.search) {
      firebaseQuery.appendId('id', filter.search);
      firebaseQuery.appendIlike('name', filter.search);
    }

    const collection = await admin
      .firestore()
      .collection(`pet`)
      .get();

    const all = this.mapCollection(collection);
    let rows = firebaseQuery.rows(all);

    if (filter && filter.owner) {
      rows = rows.filter(
        (row) => row.owner === filter.owner,
      );
    }

    return rows.map((record) => ({
      id: record.id,
      label: record['name'],
    }));
  }

  async populateAll(records) {
    return await Promise.all(
      records.map((record) => this.populate(record)),
    );
  }

  async populate(record) {
    if (!record) {
      return record;
    }

    record.owner = await this.findRelation(
      'user',
      record.owner,
    );

    record.bookings =
      (await this.findRelation(
        'booking',
        record.bookings,
      )) || [];

    return record;
  }
}

module.exports = PetRepository;
