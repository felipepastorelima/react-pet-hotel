const express = require('express');
const cors = require('cors');
const app = express();
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const config = require('../../config')();
const authService = require('../auth/authService');
const authMiddleware = require('../auth/authMiddleware');
const {
  init: databaseInit,
  middleware: databaseMiddleware,
} = require('../database/databaseInit');

databaseInit().catch((error) => console.error(error));
authService.init();

app.use(cors({ origin: true }));

app.use(
  '/',
  databaseMiddleware,
  authMiddleware,
  graphqlHTTP((req) => ({
    schema,
    graphiql: config.graphiql,
    context: {
      currentUser: req.currentUser,
      language: req.headers['accept-language'] || 'en',
    },
    formatError(error) {
      if (process.env.NODE_ENV !== 'test') {
        console.error(error);
      }

      return {
        message: error.message,
        code:
          error.originalError && error.originalError.code,
        locations: error.locations,
        path: error.path,
      };
    },
  })),
);

module.exports = app;
