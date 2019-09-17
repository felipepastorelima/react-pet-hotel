const lodash = require('lodash');
const assert = require('assert');

module.exports = class DateTime {
  validate(data) {
    if (!data) {
      return;
    }

    assert(lodash.isDate(data));
  }

  cast(data) {
    if (!data) {
      return null;
    }

    return data;
  }
};
