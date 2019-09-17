module.exports = {
  env: 'development',

  database: {
    connection: '<insert connection url here>',
    transactions: true,
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

  graphiql: 'true',

  clientUrl:
      'https://<insert project id here>.firebaseapp.com',

  defaultUser: '<insert your email here>',
};
