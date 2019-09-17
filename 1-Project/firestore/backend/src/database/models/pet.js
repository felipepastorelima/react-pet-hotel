const types = require('./types');
const AbstractEntityModel = require('./abstractEntityModel');

module.exports = class Pet extends AbstractEntityModel {
  constructor() {
    super('pet', 'pet', {
      owner: new types.RelationToOne(),
      name: new types.String(null, 255),
      type: new types.Enumerator([
        "cat",
        "dog"
      ]),
      breed: new types.String(null, 255),
      size: new types.Enumerator([
        "small",
        "medium",
        "large"
      ]),
      bookings: new types.RelationToMany(),
      importHash: new types.String(null, 255),
    });
  }
};
