const lodash = require('lodash');
const assert = require('assert');
const String = require('./string');

module.exports = class StringArray {
  constructor() {}

  validate(data) {
    if (!data) {
      return;
    }

    assert(lodash.isArray(data));
    data.forEach((item) => new String().validate(item));
  }

  cast(data) {
    if (!data) {
      return [];
    }

    return data;
  }
};
