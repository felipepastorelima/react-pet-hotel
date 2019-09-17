const genericFixture = require('./genericFixture');
const PetRepository = require('../database/repositories/petRepository');

const petFixture = genericFixture({
  idField: 'id',
  createFn: (data) => new PetRepository().create(data),
  data: [
    {
      id: '1',
      // Add attributes here
    },
  ],
});

module.exports = petFixture;
