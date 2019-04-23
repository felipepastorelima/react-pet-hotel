const validator = require('validator');
const uuid = require('uuid/v4');

module.exports = class SequelizeFilterWhere {
  constructor(Sequelize) {
    this.Sequelize = Sequelize;
    this.whereAnd = [];
    this.include = [];
  }

  appendRelationWithEqual(
    relatedModel,
    relatedAs,
    column,
    value,
  ) {
    this.include.push({
      model: relatedModel,
      as: relatedAs,
      where: { [column]: value },
    });
  }

  appendEqual(column, value) {
    this.whereAnd.push({
      [column]: value,
    });
  }

  appendId(column, value) {
    let id = value;

    // If ID is invalid, sequelize throws an error.
    // For that not to happen, if the UUID is invalid, it sets
    // some random uuid
    if (!validator.isUUID(id)) {
      id = uuid();
    }

    this.whereAnd.push({
      [column]: id,
    });
  }

  appendIn(column, value) {
    this.whereAnd.push({
      [column]: {
        [this.Sequelize.Op.in]: value,
      },
    });
  }

  appendIlike(column, value, model) {
    this.whereAnd.push(
      this.Sequelize.where(
        this.Sequelize.fn(
          'lower',
          this.Sequelize.col(`${model}.${column}`),
        ),
        {
          [this.Sequelize.Op
            .like]: `%${value}%`.toLowerCase(),
        },
      ),
    );
  }

  appendRange(column, value) {
    const [start, end] = value;

    if (start) {
      this.whereAnd.push({
        [column]: {
          [this.Sequelize.Op.gte]: start,
        },
      });
    }

    if (end) {
      this.whereAnd.push({
        [column]: {
          [this.Sequelize.Op.lte]: end,
        },
      });
    }
  }

  appendOverlap(columnStart, columnEnd, value) {
    const [start, end] = value;
    const { Op } = this.Sequelize;

    if (start) {
      this.whereAnd.push({
        [columnEnd]: {
          [Op.gte]: start,
        },
      });
    }

    if (end) {
      this.whereAnd.push({
        [columnStart]: { [Op.lte]: end },
      });
    }
  }

  reset() {
    this.include = [];
    this.whereAnd = [];
  }

  getWhere() {
    return { [this.Sequelize.Op.and]: this.whereAnd };
  }

  getInclude() {
    return this.include;
  }
};
