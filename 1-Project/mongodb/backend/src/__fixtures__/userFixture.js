const genericFixture = require('./genericFixture');
const UserRepository = require('../database/repositories/userRepository');

const userFixture = genericFixture({
  idField: 'id',
  createFn: (data) => UserRepository.create(data),
  data: [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@test.test',
      authenticationUid: '1',
      avatars: [
        {
          name: 'avatar.jpg',
          sizeInBytes: 100000,
          publicUrl: 'http://path.path/avatar.jpg',
          privateUrl: 'path/avatar.jpg',
          new: true,
        },
      ],
    },
    {
      id: '2',
      firstName: 'Jack',
      lastName: 'Doe',
      email: 'jack@test.test',
      authenticationUid: '2',
      avatars: [
        {
          name: 'avatar.jpg',
          sizeInBytes: 100000,
          publicUrl: 'http://path.path/avatar.jpg',
          privateUrl: 'path/avatar.jpg',
          new: true,
        },
      ],
    },
    {
      id: '3',
      firstName: 'Mark',
      lastName: 'Doe',
      email: 'mark@test.test',
      authenticationUid: '3',
      avatars: [
        {
          name: 'avatar.jpg',
          sizeInBytes: 100000,
          publicUrl: 'http://path.path/avatar.jpg',
          privateUrl: 'path/avatar.jpg',
          new: true,
        },
      ],
    },
  ],
});

module.exports = userFixture;
