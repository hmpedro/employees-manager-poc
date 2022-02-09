const mongoose = require('mongoose');
const { AppEnv, MongoEnv } = require('../config/index');

const url = MongoEnv.MONGO_URL;

mongoose.set('debug', AppEnv.NODE_ENV === 'development');

mongoose.connection.on('connected', () => console.info(`Mongoose default connection open to ${url}`));

mongoose.connection.on('error', (err) => console.error(`Mongoose default connection error: ${err}`));

mongoose.connection.on('disconnected', () => console.info('Mongoose default connection disconnected'));

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.error('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = () => mongoose.connect(url);
