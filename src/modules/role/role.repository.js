const Role = require('./role.model');
const DatabaseError = require('../../utils/errors/database.error');

/**
 * @typedef RoleRepository
 */
class RoleRepository {
  /**
   * @retrieve
   */
  async retrieve(filters = {}) {
    try {
      const filtersToMongo = this.buildMongoFilters(filters);
      const roles = await Role.find(filtersToMongo).select({ __v: false }).exec();
      console.log(roles);
      return roles;
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  /**
   * @retrieveById
   */
  async retrieveById(roleId) {
    try {
      const role = await Role.findById(roleId);
      delete role?.__v;
      return role;
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  /**
   * @create
   */
  async create(roleObj) {
    try {
      const insertedRole = await Role.create(roleObj);
      const role = insertedRole.toJSON();
      delete role.__v;
      return role;
    } catch (e) {
      throw new DatabaseError({
        key: Object.keys(e.keyPattern)[0],
        code: e.code,
        message: e.message,
      });
    }
  }

  /**
   * @update
   */
  async update(roleId, roleObj) {
    try {
      const updatedRole = await Role.findOneAndUpdate({ _id: roleId }, roleObj, { new: true });
      const role = updatedRole.toJSON();
      delete role.__v;
      return role;
    } catch (e) {
      throw new DatabaseError({
        key: Object.keys(e.keyPattern)[0],
        code: e.code,
        message: e.message,
      });
    }
  }

  /**
   * @deleteById
   */
  async deleteById(roleId) {
    try {
      const deletedObj = await Role.deleteOne({
        _id: roleId,
      });
      return deletedObj.deletedCount > 0;
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  buildMongoFilters(filters) {
    const { title } = filters;
    const builded = {};

    if (title) {
      builded.title = { $regex: `.*${title}.*`, $options: 'i' };
    }

    return builded;
  }
}

module.exports = RoleRepository;
