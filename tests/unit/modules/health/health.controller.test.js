const { HTTP_STATUS_OK } = require('http2').constants;
const HealthController = require('../../../../src/modules/heath/health.controller');

let healthController;

describe('Testing health check route', () => {
  beforeAll(() => {
    healthController = new HealthController();
  });

  it('should return 200 OK', () => {
    const response = healthController.check();

    expect(response.status).toEqual(HTTP_STATUS_OK);
    expect(response.body.status).toEqual('OK');
  });
});
