const { constants: httpConstants } = require('http2');

class TagController {
  /**
   * @constructor
   * @param { TagService } tagService
   * @param {{ retrieve, retrieveById, create, update }} tagValidator
   */
  constructor({
    tagService,
    tagValidator,
  }) {
    this.tagService = tagService;
    this.tagValidator = tagValidator;

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
    const valid = this.tagValidator.retrieve(query);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.tagValidator.retrieve.errors,
        },
      };
    }

    const tags = await this.tagService.retrieve(query);

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        tags,
      },
    };
  }

  /**
   * @retrieveById
   */
  async retrieveById({ params }) {
    const { tagId } = params;

    const valid = this.tagValidator.retrieveById(params);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.tagValidator.retrieveById.errors,
        },
      };
    }

    const tag = await this.tagService.retrieveById(tagId);

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        tag,
      },
    };
  }

  /**
   * @create
   */
  async create({ body }) {
    const tagObj = { ...body };

    const valid = this.tagValidator.create(tagObj);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.tagValidator.create.errors,
        },
      };
    }

    const tag = await this.tagService.create(tagObj);

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        tag,
      },
    };
  }

  /**
   * @update
   */
  async update({ params, body }) {
    const { tagId } = params;
    const tagObj = { ...body };

    const valid = this.tagValidator.update({ tagId, ...tagObj });

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.tagValidator.update.errors,
        },
      };
    }

    const tag = await this.tagService.update(tagId, tagObj);

    return {
      status: httpConstants.HTTP_STATUS_OK,
      body: {
        tag,
      },
    };
  }

  /**
   * @delete
   */
  async delete({ params }) {
    const { tagId } = params;

    const valid = this.tagValidator.retrieveById(params);

    if (!valid) {
      return {
        status: httpConstants.HTTP_STATUS_BAD_REQUEST,
        body: {
          errors: this.tagValidator.retrieveById.errors,
        },
      };
    }

    await this.tagService.deleteById(tagId);

    return {
      status: httpConstants.HTTP_STATUS_NO_CONTENT,
    };
  }
}

module.exports = TagController;
