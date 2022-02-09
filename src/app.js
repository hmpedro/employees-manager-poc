const express = require('express');
const cors = require('cors');
const mongodb = require('./database/mongodb');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-handler.middleware');

class App {
  constructor() {
    this.express = express();
    this.mongoose = mongodb;
    this._initDbConnection();
    this._middlewares();
    this._routes();
  }

  _middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
  }

  _routes() {
    this.express.use(routes);
    this.express.use(errorHandler);
  }

  _initDbConnection() {
    try {
      this.mongoose();
      console.info(`[MONGODB] connected on: ${new Date()}`);
    } catch (error) {
      console.error('Can\'t connect to Postgress:', error.message);
      process.exit(1);
    }
  }
}

module.exports = new App().express;
