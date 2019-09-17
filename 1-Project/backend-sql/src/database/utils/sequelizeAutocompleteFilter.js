const validator = require('validator');

module.exports = class SequelizeAutocompleteFilter {
  constructor(Sequelize) {
    this.Sequelize = Sequelize;
    this.whereOr = [];
  }

  appendId(column, value) {
    let id = value;

    if (!validator.isUUID(id)) {
      return;
    }

    this.whereOr.push({
      [column]: id,
    });
  }

  appendEqual(column, value) {
    this.whereOr.push({
      [column]: value,
    });
  }

  appendIlike(column, value, model) {
    this.whereOr.push(
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

  reset() {
    this.include = [];
    this.whereOr = [];
  }

  getWhere() {
    if (!this.whereOr.length) {
      return undefined;
    }

    return { [this.Sequelize.Op.or]: this.whereOr };
  }
};
