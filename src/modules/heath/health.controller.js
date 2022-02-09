const { HTTP_STATUS_OK } = require('http2').constants;

class HealthController {
  static check() {
    return {
      status: HTTP_STATUS_OK,
      body: { status: 'OK' },
    };
  }
}

module.exports = HealthController;
