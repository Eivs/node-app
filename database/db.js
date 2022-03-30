const mongoose = require('mongoose');
const config = require('../config');

mongoose.Promise = global.Promise;
const protocol = 'mongodb://';
const databaseUrl = `${protocol}${process.env.MONGODB_URI || config.database}`;

mongoose
  .connect(databaseUrl, {
    autoIndex: false,
    serverSelectionTimeoutMS: 5000,
  })
  .catch(err => console.log(err.reason));

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected: ${databaseUrl}`);
});

mongoose.connection.on('error', err => {
  console.error(`mongoose connect failed: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected.');
});

module.exports = mongoose;
