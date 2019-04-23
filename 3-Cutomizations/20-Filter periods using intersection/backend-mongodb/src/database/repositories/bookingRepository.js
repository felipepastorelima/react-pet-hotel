const AbstractEntityRepository = require('./abstractEntityRepository');
const MongooseQuery = require('../utils/mongooseQuery');
const Booking = require('../models/booking');
const Pet = require('../models/pet');
const bookingStatus = require('../../enumerators/bookingStatus');

class BookingRepository extends AbstractEntityRepository {
  constructor() {
    super(Booking);
  }

  async refreshTwoWayRelations(record, options) {
    await this.refreshTwoWayRelationOneToMany(
      record,
      'pet',
      Pet,
      'bookings',
      options,
    );
  }

  async destroyFromRelations(id, options) {
    await this.destroyRelationToMany(
      id,
      Pet,
      'bookings',
      options,
    );
  }

  async findById(id, options) {
    return this.wrapWithSessionIfExists(
      Booking.findById(id)
        .populate('owner')
        .populate('pet'),
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

      if (filter.pet) {
        query.appendId('pet', filter.pet);
      }

      if (filter.arrivalRange) {
        query.appendRange('arrival', filter.arrivalRange);
      }

      if (filter.departureRange) {
        query.appendRange(
          'departure',
          filter.departureRange,
        );
      }

      if (filter.period) {
        query.appendOverlap(
          'arrival',
          'departure',
          filter.period,
        );
      }

      if (filter.status) {
        query.appendEqual('status', filter.status);
      }

      if (filter.feeRange) {
        query.appendRange('fee', filter.feeRange);
      }

      if (filter.createdAtRange) {
        query.appendRange(
          'createdAt',
          filter.createdAtRange,
        );
      }
    }

    const rows = await Booking.find(query.criteria)
      .skip(query.skip)
      .limit(query.limit)
      .sort(query.sort)
      .populate('owner')
      .populate('pet');

    const count = await Booking.countDocuments(
      query.criteria,
    );

    return { rows, count };
  }

  async findAllAutocomplete(filter, limit) {
    let mongooseQuery = MongooseQuery.forAutocomplete({
      limit,
      orderBy: 'id_ASC',
    });

    if (filter && filter.search) {
      mongooseQuery.appendId('_id', filter.search);
    }

    let criteria = mongooseQuery.criteria;

    if (filter && filter.owner) {
      criteria = {
        $and: [criteria, { owner: filter.owner }].filter(
          Boolean,
        ),
      };
    }

    const records = await Booking.find(criteria)
      .limit(mongooseQuery.limit)
      .sort(mongooseQuery.sort);

    return records.map((record) => ({
      id: record.id,
      label: record['id'],
    }));
  }

  async existsForPet(petId) {
    const count = await Booking.countDocuments({
      pet: petId,
    });

    return count > 0;
  }

  async countActiveBookingInPeriod(
    start,
    end,
    idToExclude,
  ) {
    // departure >= start and arrival <= end
    let criteria = {
      status: {
        $in: [bookingStatus.BOOKED, bookingStatus.PROGRESS],
      },
      arrival: {
        $lte: end,
      },
      departure: {
        $gte: start,
      },
    };

    if (idToExclude) {
      criteria = {
        ...criteria,
        _id: {
          $ne: idToExclude,
        },
      };
    }

    const count = await Booking.countDocuments(criteria);
    return count;
  }
}

module.exports = BookingRepository;
