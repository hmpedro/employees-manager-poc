const Employee = require('./employee.model');
const DatabaseError = require('../../utils/errors/database.error');

/**
 * @typedef EmployeeRepository
 */
class EmployeeRepository {
  /**
   * @retrieve
   */
  async retrieve(filters = {}) {
    try {
      const filtersToMongo = this.buildMongoFilters(filters);
      const employees = await Employee.find(filtersToMongo)
        .select({ __v: false })
        .populate('role', { __v: false })
        .populate('tags', { __v: false })
        .exec();
      console.log(employees);
      return employees;
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  /**
   * @retrieveById
   */
  async retrieveById(employeeId) {
    try {
      const retrievedEmployee = await Employee.findById(employeeId);
      const employee = retrievedEmployee?.toJSON();
      // eslint-disable-next-line no-underscore-dangle
      delete employee?.__v;
      return employee;
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  /**
   * @create
   */
  async create(employeeObj) {
    try {
      const insertedEmployee = await Employee.create(employeeObj);
      const employee = insertedEmployee.toJSON();
      delete employee.__v;
      return employee;
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
  async update(employeeId, employeeObj) {
    try {
      const updatedRole = await Employee.updateOne({ _id: employeeId }, employeeObj);
      return updatedRole.modifiedCount > 0;
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
  async deleteById(employeeId) {
    try {
      const deletedObj = await Employee.deleteOne({
        _id: employeeId,
      });
      return deletedObj.deletedCount > 0;
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  buildMongoFilters(filters) {
    const { name, tags } = filters;
    const builded = {};

    if (name) {
      builded.name = {
        $regex: `.*${name}.*`,
        $options: 'i',
      };
    }

    if (tags) {
      builded.tags = tags;
    }

    return builded;
  }
}

module.exports = EmployeeRepository;
