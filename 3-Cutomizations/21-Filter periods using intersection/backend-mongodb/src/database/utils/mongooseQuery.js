const database = require('../database');

module.exports = class MongooseQuery {
  constructor(limit, skip, orderBy, isOr = false) {
    this._criteria = [];
    this.limit = limit || undefined;
    this.skip = skip || undefined;
    this.sort = this._buildSort(orderBy);
    this.isOr = isOr;
  }

  static forList({
    limit = undefined,
    offset = undefined,
    orderBy = undefined,
  }) {
    return new MongooseQuery(limit, offset, orderBy, false);
  }

  static forAutocomplete({
    limit = undefined,
    offset = undefined,
    orderBy = undefined,
  }) {
    return new MongooseQuery(limit, offset, orderBy, true);
  }

  appendEqual(column, value) {
    this._criteria.push({
      [column]: value,
    });
  }

  appendId(column, value) {
    let id = value;

    // If ID is invalid, mongodb throws an error.
    // For that not to happen, if the ObjectID is invalid, it sets
    // some random ObjectID
    if (!database.Types.ObjectId.isValid(id)) {
      id = database.Types.ObjectId.createFromTime(
        +new Date(),
      );
    }

    this._criteria.push({
      [column]: id,
    });
  }

  appendIn(column, value) {
    this._criteria.push({
      [column]: {
        $in: value,
      },
    });
  }

  appendIlike(column, value) {
    this._criteria.push({
      [column]: new RegExp(value, 'i'),
    });
  }

  appendRange(column, value) {
    const [start, end] = value;

    if (start) {
      this._criteria.push({
        [column]: {
          $gte: start,
        },
      });
    }

    if (end) {
      this._criteria.push({
        [column]: {
          $lte: end,
        },
      });
    }
  }

  appendOverlap(columnStart, columnEnd, value) {
    const [start, end] = value;

    if (start) {
      this._criteria.push({
        [columnEnd]: {
          $gte: start,
        },
      });
    }

    if (end) {
      this._criteria.push({
        [columnStart]: {
          $lte: end,
        },
      });
    }
  }

  reset() {
    this._criteria = [];
  }

  _buildSort(orderBy) {
    if (!orderBy) {
      return undefined;
    }

    let [column, order] = orderBy.split('_');

    if (column === 'id') {
      column = '_id';
    }

    return {
      [column]: order === 'ASC' ? 1 : -1,
    };
  }

  get criteria() {
    if (!this._criteria.length) {
      return undefined;
    }

    if (!this.isOr) {
      return {
        $and: this._criteria,
      };
    }

    return {
      $or: this._criteria,
    };
  }
};
