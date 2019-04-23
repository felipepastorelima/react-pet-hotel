const types = require('./types');
const AbstractEntityModel = require('./abstractEntityModel');

module.exports = class Settings extends AbstractEntityModel {
  constructor() {
    super('settings', 'settings', {
      theme: new types.String(null, 255),
      dailyFee: new types.Number(0.01, null),
      capacity: new types.Number(1, null),
    });
  }
};
