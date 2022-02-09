class InternalError extends Error {
  constructor({ message, rawError }) {
    super(message);
    this.rawError = rawError;
  }
}

module.exports = InternalError;
