const httpConstants = require('http2').constants;
const BusinessError = require('../utils/errors/internal.error');

// eslint-disable-next-line no-unused-vars
module.exports = (error, req, res, next) => {
  const defaultMessage = 'internal.server.error';

  console.error(`${new Date()} - [Server] Logging error:`);
  console.error(error);

  if (error instanceof BusinessError) {
    res.status(httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
      message: defaultMessage,
    });
  } else {
    res.status(error.status || httpConstants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({
      message: error.message || defaultMessage,
    });
  }
};
