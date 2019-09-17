const lodash = require('lodash');
const assert = require('assert');

module.exports = class String {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }

  validate(data) {
    if (!data) {
      return;
    }

    assert(lodash.isString(data));

    if (this.min || this.min === 0) {
      assert(data.length >= this.min);
    }

    if (this.max || this.max === 0) {
      assert(data.length <= this.min);
    }
  }

  cast(data) {
    if (!data) {
      return null;
    }

    return data;
  }
};
