module.exports = {
  env: 'development',

  database: {
    username: 'postgres',
    dialect: 'postgres',
    password: '',
    database: 'development',
    migrationHost: '<insert public ip here>',
    host:
      '/cloudsql/<insert project id>:us-central1:<insert database id>',
    logging: console.log,
    operatorsAliases: false,
  },

  // database: {
  //   username: 'root',
  //   dialect: 'mysql',
  //   password: '',
  //   database: 'development',
  //   host:
  //     '/cloudsql/<project id>:us-central1:<database id>',
  //   migrationHost: '<insert public ip here>',
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

  graphiql: 'true',

  clientUrl:
      'https://<insert project id here>.firebaseapp.com',

  defaultUser: '<insert your email here>',
};
