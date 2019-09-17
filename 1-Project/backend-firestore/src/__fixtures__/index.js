const userFixture = require('./userFixture');
const petFixture = require('./petFixture');
const bookingFixture = require('./bookingFixture');
const AbstractRepository = require('../database/repositories/abstractRepository');

module.exports = {
  user: userFixture,
  pet: petFixture,
  booking: bookingFixture,

  async cleanDatabase() {
    await AbstractRepository.cleanDatabase();
  },
};
