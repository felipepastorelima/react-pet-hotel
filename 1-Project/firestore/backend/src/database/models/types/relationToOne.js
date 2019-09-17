const lodash = require('lodash');
const assert = require('assert');

module.exports = class RelationToOne {
  validate(data) {
    if (!data) {
      return;
    }

    assert(lodash.isString(data));
  }

  cast(data) {
    if (!data) {
      return null;
    }

    return data;
  }
};
