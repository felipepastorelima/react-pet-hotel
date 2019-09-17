module.exports = {
  env: 'test',

  database: {
    // connection:
    //   'mongodb://localhost:27017,localhost:27018,localhost:27019/test?replicaSet=rs',
    // transactions: true,
    connection: 'mongodb://localhost:27017/test',
    transactions: false,
  },

  email: {
    auth: {
      user: 'mock',
    },
  },

  graphiql: false,

  clientUrl: 'http://localhost:3000',

  defaultUser: '<insert your email here>',
};
