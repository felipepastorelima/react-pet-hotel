const lodash = require('lodash');
const assert = require('assert');

module.exports = class RelationToMany {
  validate(data) {
    if (!data) {
      return;
    }

    assert(lodash.isArray(data));
    data.forEach((item) => assert(lodash.isString(item)));
  }

  cast(data) {
    if (!data) {
      return [];
    }

    return data;
  }
};
