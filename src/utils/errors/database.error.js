const InternalError = require('./internal.error');

class DatabaseError extends InternalError {
  constructor({
    message, rawError = '', code, key,
  }) {
    super({ message, rawError });
    this.name = 'DatabaseError';
    this.code = code;
    this.key = key;
  }
}

module.exports = DatabaseError;
