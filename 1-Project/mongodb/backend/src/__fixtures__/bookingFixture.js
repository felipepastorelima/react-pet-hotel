const genericFixture = require('./genericFixture');
const BookingRepository = require('../database/repositories/bookingRepository');

const bookingFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new BookingRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = bookingFixture;
