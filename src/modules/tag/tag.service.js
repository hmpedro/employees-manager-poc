const InvalidFormatError = require('../../utils/errors/invalid-format.error');
const NotFoundError = require('../../utils/errors/not-found.error');

/**
 * @typedef TagService
 */
class TagService {
  /**
   * @constructor
   * @param {TagRepository} tagRepository
   */
  constructor({ tagRepository }) {
    this.tagRepository = tagRepository;

    this.retrieve = this.retrieve.bind(this);
    this.retrieveById = this.retrieveById.bind(this);
    this.retrieveManyById = this.retrieveManyById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.deleteById = this.deleteById.bind(this);
  }

  /**
   * @retrieve
   */
  async retrieve(filters) {
    return this.tagRepository.retrieve(filters);
  }

  /**
   * @retrieveById
   */
  async retrieveById(tagId) {
    return this.tagRepository.retrieveById(tagId);
  }

  /**
   * @create
   */
  async create(tag) {
    try {
      return await this.tagRepository.create(tag);
    } catch (e) {
      if (e.code === 11000) {
        throw new InvalidFormatError({ message: `invalid.tag.${e.key}.already.exists` });
      }

      throw e;
    }
  }

  /**
   * @update
   */
  async update(tagId, tag) {
    try {
      return await this.tagRepository.update(tagId, tag);
    } catch (e) {
      if (e.code === 11000) {
        throw new InvalidFormatError({ message: `invalid.tag.${e.key}.already.exists` });
      }

      throw e;
    }
  }

  /**
   * @retrieveManyById
   */
  async retrieveManyById(tagsObjectIds) {
    return this.tagRepository.retrieveManyById(tagsObjectIds);
  }

  /**
   * @deleteById
   */
  async deleteById(tagId) {
    const deleted = await this.tagRepository.deleteById(tagId);

    if (!deleted) {
      throw new NotFoundError({ message: 'not.found.tag' });
    }

    return deleted;
  }
}

module.exports = TagService;
