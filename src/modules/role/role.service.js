const InvalidFormatError = require('../../utils/errors/invalid-format.error');
const NotFoundError = require('../../utils/errors/not-found.error');

/**
 * @typedef RoleService
 */
class RoleService {
  /**
   * @constructor
   * @param {RoleRepository} roleRepository
   */
  constructor({ roleRepository }) {
    this.roleRepository = roleRepository;

    this.retrieve = this.retrieve.bind(this);
    this.retrieveById = this.retrieveById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.deleteById = this.deleteById.bind(this);
  }

  /**
   * @retrieve
   */
  async retrieve() {
    return this.roleRepository.retrieve();
  }

  /**
   * @retrieveById
   */
  async retrieveById(roleId) {
    return this.roleRepository.retrieveById(roleId);
  }

  /**
   * @create
   */
  async create(role) {
    try {
      return await this.roleRepository.create(role);
    } catch (e) {
      if (e.code === 11000) {
        throw new InvalidFormatError({ message: `invalid.role.${e.key}.already.exists` });
      }

      throw e;
    }
  }

  /**
   * @update
   */
  async update(roleId, role) {
    try {
      return await this.roleRepository.update(roleId, role);
    } catch (e) {
      if (e.code === 11000) {
        throw new InvalidFormatError({ message: `invalid.role.${e.key}.already.exists` });
      }

      throw e;
    }
  }

  /**
   * @deleteById
   */
  async deleteById(roleId) {
    const deleted = await this.roleRepository.deleteById(roleId);

    if (!deleted) {
      throw new NotFoundError({ message: 'not.found.role' });
    }

    return deleted;
  }
}

module.exports = RoleService;
