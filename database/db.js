const mongoose = require('mongoose');
const config = require('../config');
const { logger } = require('../utils/logger');

mongoose.Promise = global.Promise;
const protocol = 'mongodb://';
const databaseUrl = `${protocol}${config.database}`;

mongoose
  .connect(databaseUrl, {
    autoIndex: false,
    serverSelectionTimeoutMS: 5000,
  })
  .catch(err => logger.error(err.reason));

mongoose.connection.on('connected', () => {
  logger.info(`Mongoose connected: ${databaseUrl}`);
});

mongoose.connection.on('error', err => {
  logger.error(`mongoose connect failed: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  logger.info('Mongoose disconnected.');
});

module.exports = mongoose;
