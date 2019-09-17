const lodash = require('lodash');
const assert = require('assert');
const moment = require('moment');

module.exports = class Date {
  validate(data) {
    if (!data) {
      return;
    }

    assert(lodash.isString(data));
    assert(moment(data, 'YYYY-MM-DD').isValid());
  }

  cast(data) {
    if (!data) {
      return null;
    }

    return data;
  }
};
