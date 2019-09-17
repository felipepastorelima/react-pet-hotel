module.exports = {
  env: 'test',

  database: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
    operatorsAliases: false,
  },

  email: {
    auth: {
      user: 'mock',
    },
  },

  graphiql: false,

  project: {
    name: 'app.title',
    clientUrl: 'http://localhost:3000',
  },

  defaultUser: '<insert your email here>',
};
