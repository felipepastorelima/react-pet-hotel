const lodash = require('lodash');
const assert = require('assert');

module.exports = class Number {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  cast(data) {
    if (!data) {
      return null;
    }

    return data;
  }

  validate(data) {
    if (!data) {
      return;
    }

    assert(lodash.isNumber(data));

    if (this.min || this.min === 0) {
      assert(data >= this.min);
    }

    if (this.max || this.max === 0) {
      assert(data <= this.min);
    }
  }
};
