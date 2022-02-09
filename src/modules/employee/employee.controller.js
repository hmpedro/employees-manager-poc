const { constants: httpConstants } = require('http2');

class EmployeeController {
  /**
   * @constructor
   * @param { EmployeeService } employeeService
   * @param {{ retrieve, retrieveById, create, update }} employeeValidator
   */
  constructor({ employeeService, employeeValidator }) {
    this.employeeService = employeeService;
    this.employeeValidator = employeeValidator;

    this.retrieve = this.retrieve.bind(this);
    this.retrieveById = this.retrieveById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  /**
   * @retrieve
   */
  async retrieve({ query }) {
    const valid = this.employeeValidator.retrieve(query);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.employeeValidator.retrieve.errors,
        },
      };
    }

    const employees = await this.employeeService.retrieve(query);

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        employees,
      },
    };
  }

  /**
   * @retrieveById
   */
  async retrieveById({ params }) {
    const { employeeId } = params;

    const valid = this.employeeValidator.retrieveById(params);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.employeeValidator.retrieveById.errors,
        },
      };
    }

    const employee = await this.employeeService.retrieveById(employeeId);

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        employee,
      },
    };
  }

  /**
   * @create
   */
  async create({ body }) {
    const roleObj = { ...body };

    const valid = this.employeeValidator.create(roleObj);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.employeeValidator.create.errors,
        },
      };
    }

    const employee = await this.employeeService.create(roleObj);

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        employee,
      },
    };
  }

  /**
   * @update
   */
  async update({ params, body }) {
    const { employeeId } = params;
    const employeeObj = { ...body };

    const valid = this.employeeValidator.update({ employeeId, ...employeeObj });

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.employeeValidator.update.errors,
        },
      };
    }

    await this.employeeService.update(employeeId, employeeObj);

    return {
      status: httpConstants.HTTP_STATUS_NO_CONTENT,
    };
  }

  /**
   * @delete
   */
  async delete({ params }) {
    const { employeeId } = params;

    const valid = this.employeeValidator.retrieveById(params);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.employeeValidator.retrieveById.errors,
        },
      };
    }

    await this.employeeService.deleteById(employeeId);

    return {
      status: httpConstants.HTTP_STATUS_NO_CONTENT,
    };
  }
}

module.exports = EmployeeController;
