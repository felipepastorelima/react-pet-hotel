module.exports = {
  env: 'localhost',

  database: {
    username: 'postgres',
    dialect: 'postgres',
    password: '',
    database: 'development',
    host: 'localhost',
    migrationHost: 'localhost',
    logging: console.log,
    operatorsAliases: false,
  },

  // database: {
  //   username: 'root',
  //   dialect: 'mysql',
  //   password: '',
  //   database: 'development',
  //   host: 'localhost',
  //   migrationHost: 'localhost',
  //   logging: console.log,
  //   operatorsAliases: false,
  // },

  email: {
    comment: 'See https://nodemailer.com',
    from: '<insert your email here>',
    host: null,
    auth: {
      user: null,
      pass: null,
    },
  },

  graphiql: true,

  clientUrl: 'http://localhost:3000',

  defaultUser: '<insert your email here>',
};
