const path = require('path');

require('dotenv').config({
  path: path.resolve(__filename, '../../../.env'),
});

class MongoEnv {
  static get MONGO_URL() {
    return process.env.MONGO_URL || 'mongodb://localhost:27017/pedro-mognon-project';
  }
}

module.exports = MongoEnv;
