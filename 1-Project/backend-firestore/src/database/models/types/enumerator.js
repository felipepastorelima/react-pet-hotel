const lodash = require('lodash');
const assert = require('assert');

module.exports = class Enumerator {
  constructor(values) {
    this.values = values;
  }

  validate(data) {
    if (!data) {
      return;
    }

    assert(lodash.isString(data));
    assert(this.values.includes(data));
  }

  cast(data) {
    if (!data) {
      return null;
    }

    return data;
  }
};
