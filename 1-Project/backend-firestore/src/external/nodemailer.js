module.exports = () => {
  const isTest = process.env.NODE_ENV === 'test';
  if (isTest) {
    return require('../__mocks__/nodemailer');
  }

  return require('nodemailer');
};
