const functions = require('firebase-functions');

const api = require('./src/api');

const runtimeOpts = {
  timeoutSeconds: 60,
  memory: '1GB',
};

exports.api = functions
  .runWith(runtimeOpts)
  .https.onRequest(api);
