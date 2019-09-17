module.exports = function get() {
  const isMigration = !!process.env.MIGRATION_ENV;

  if (isMigration) {
    const config = require(`./${
      process.env.MIGRATION_ENV
    }`);

    return {
      ...config,

      // For migration the host is the external IP
      database: {
        ...config.database,
        host: config.database.migrationHost,
      },
    };
  }

  const isAppEngineEnv = !!process.env.APP_ENGINE_ENV;

  if (isAppEngineEnv) {
    const config = require(`./${
      process.env.APP_ENGINE_ENV
    }`);

    return config;
  }

  const isTest = process.env.NODE_ENV === 'test';

  if (isTest) {
    return require('./test');
  }

  const functions = require('firebase-functions');

  const isLocalhost =
    !functions.config() ||
    !functions.config().env ||
    !functions.config().env.value ||
    functions.config().env.value === 'localhost';

  if (isLocalhost) {
    return require('./localhost');
  }

  return require(`./${functions.config().env.value}`);
};
