module.exports = {
  env: 'production',

  email: {
    comment: 'See https://nodemailer.com',
    from: '<insert your email here>',
    host: null,
    auth: {
      user: null,
      pass: null,
    },
  },

  graphiql: false,

  clientUrl:
      'https://<insert project id here>.firebaseapp.com',

  defaultUser: null,
};
