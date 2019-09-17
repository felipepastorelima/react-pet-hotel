const lodash = require('lodash');
const assert = require('assert');
const uuid = require('uuid/v4');

module.exports = class File {
  validate(data) {
    if (!data) {
      return;
    }

    assert(Array.isArray(data));

    data.forEach((item) => {
      if (item.name) {
        assert(lodash.isString(item.name));
        assert(item.name.length < 21845);
      }

      if (item.sizeInBytes) {
        assert(lodash.isNumber(item.sizeInBytes));
      }

      if (item.privateUrl) {
        assert(lodash.isString(item.privateUrl));
        assert(item.privateUrl.length < 21845);
      }

      if (item.publicUrl) {
        assert(lodash.isString(item.publicUrl));
        assert(item.publicUrl.length < 21845);
      }
    });
  }

  cast(data) {
    return data
      ? data.map((item) => ({
          id: item.id || uuid(),
          name: item.name,
          sizeInBytes: item.sizeInBytes || null,
          privateUrl: item.privateUrl || null,
          publicUrl: item.publicUrl,
        }))
      : [];
  }
};
