const lodash = require('lodash');
const assert = require('assert');

module.exports = class Boolean {
  validate(data) {
    if (!data) {
      return;
    }

    assert(lodash.isBoolean(data));
  }

  cast(data) {
    if (!data) {
      return false;
    }

    return !!data;
  }
};
