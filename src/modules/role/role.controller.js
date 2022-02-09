const { constants: httpConstants } = require('http2');

class RoleController {
  /**
   * @constructor
   * @param { RoleService } roleService
   * @param {{ retrieve, retrieveById, create, update }} roleValidator
   */
  constructor({ roleService, roleValidator }) {
    this.roleService = roleService;
    this.roleValidator = roleValidator;

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
    const valid = this.roleValidator.retrieve(query);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.roleValidator.retrieve.errors,
        },
      };
    }

    const roles = await this.roleService.retrieve();

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        roles,
      },
    };
  }

  /**
   * @retrieveById
   */
  async retrieveById({ params }) {
    const { roleId } = params;

    const valid = this.roleValidator.retrieveById(params);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.roleValidator.retrieveById.errors,
        },
      };
    }

    const role = await this.roleService.retrieveById(roleId);

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        role,
      },
    };
  }

  /**
   * @create
   */
  async create({ body }) {
    const roleObj = { ...body };

    const valid = this.roleValidator.create(roleObj);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.roleValidator.create.errors,
        },
      };
    }

    const role = await this.roleService.create(roleObj);

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        role,
      },
    };
  }

  /**
   * @update
   */
  async update({ params, body }) {
    const { roleId } = params;
    const roleObj = { ...body };

    const valid = this.roleValidator.update({ roleId, ...roleObj });

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.roleValidator.update.errors,
        },
      };
    }

    const role = await this.roleService.update(roleId, roleObj);

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        role,
      },
    };
  }

  /**
   * @delete
   */
  async delete({ params }) {
    const { roleId } = params;

    const valid = this.roleValidator.retrieveById(params);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.roleValidator.retrieveById.errors,
        },
      };
    }

    await this.roleService.deleteById(roleId);

    return {
      status: httpConstants.HTTP_STATUS_NO_CONTENT,
    };
  }
}

module.exports = RoleController;
