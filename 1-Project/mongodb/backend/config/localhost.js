module.exports = {
  env: 'localhost',

  database: {
    // connection:
    //   'mongodb://localhost:27017,localhost:27018,localhost:27019/development?replicaSet=rs',
    // transactions: true,
    connection: 'mongodb://localhost:27017/development',
    transactions: false,
  },

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

  clientUrl:
      'https://<insert project id here>.firebaseapp.com',

  defaultUser: '<insert your email here>',
};
