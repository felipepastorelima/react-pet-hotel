const types = require('./types');
const AbstractEntityModel = require('./abstractEntityModel');
const bookingStatus = require('../../enumerators/bookingStatus');

module.exports = class Booking extends AbstractEntityModel {
  constructor() {
    super('booking', 'booking', {
      owner: new types.RelationToOne(),
      pet: new types.RelationToOne(),
      arrival: new types.DateTime(),
      departure: new types.DateTime(),
      clientNotes: new types.String(null, 20000),
      employeeNotes: new types.String(null, 20000),
      photos: new types.Files(),
      status: new types.Enumerator([
        bookingStatus.BOOKED,
        bookingStatus.PROGRESS,
        bookingStatus.CANCELLED,
        bookingStatus.COMPLETED,
      ]),
      cancellationNotes: new types.String(null, 20000),
      fee: new types.Number(null, null),
      receipt: new types.Files(),
      importHash: new types.String(null, 255),
    });
  }
};
