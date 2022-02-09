const { ObjectId } = require('mongoose').Types;
const Employee = require('./employee.model');
const InvalidFormatError = require('../../utils/errors/invalid-format.error');
const RequiredPropertyError = require('../../utils/errors/required-property.error');
const NotFoundError = require('../../utils/errors/not-found.error');

const EMPLOYEE_TYPE_CONTRACTOR = 'contractor';
const EMPLOYEE_TYPE_EMPLOYEE = 'employee';

const prepareEmployee = {
  contractor(employee, isUpdate) {
    const additionalUpdates = {
      $unset: {},
    };

    const preparedEmployee = {
      ...employee,
    };

    if (preparedEmployee.role?.length === 0) {
      delete preparedEmployee.role;
      if (isUpdate) {
        additionalUpdates.$unset.role = 1;
      }
    }

    return { preparedEmployee, additionalUpdates };
  },
  employee(employee, isUpdate) {
    const additionalUpdates = {
      $unset: {},
    };

    const preparedEmployee = {
      ...employee,
    };

    delete preparedEmployee.contract_duration;
    if (isUpdate) {
      additionalUpdates.$unset.contract_duration = 1;
    }

    return { preparedEmployee, additionalUpdates };
  },
};

/**
 * @typedef EmployeeService
 */
class EmployeeService {
  /**
   * @constructor
   * @param {EmployeeRepository} employeeRepository
   * @param {RoleService} roleService
   * @param {TagService} tagService
   */
  constructor({
    employeeRepository,
    roleService,
    tagService,
  }) {
    this.employeeRepository = employeeRepository;
    this.roleService = roleService;
    this.tagService = tagService;

    this.retrieve = this.retrieve.bind(this);
    this.retrieveById = this.retrieveById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.deleteById = this.deleteById.bind(this);
  }

  /**
   * @retrieve
   */
  async retrieve(filters) {
    return this.employeeRepository.retrieve(filters);
  }

  /**
   * @retrieveById
   */
  async retrieveById(employeeId) {
    return this.employeeRepository.retrieveById(employeeId);
  }

  /**
   * @create
   */
  async create(employee) {
    try {
      const { preparedEmployee } = prepareEmployee[employee.type](employee);

      await this.validateEmployee(preparedEmployee);

      return await this.employeeRepository.create(preparedEmployee);
    } catch (e) {
      if (e.code === 11000) {
        throw new InvalidFormatError({ message: `invalid.employee.${e.key}.already.exists` });
      }

      throw e;
    }
  }

  /**
   * @update
   */
  async update(employeeId, employeeUpdate) {
    const actualEmployee = await this.retrieveById(employeeId);

    if (!actualEmployee) {
      throw new NotFoundError({ message: 'not.found.employee' });
    }

    const mergedEmployee = { ...actualEmployee, ...employeeUpdate };

    const { preparedEmployee, additionalUpdates } = prepareEmployee[mergedEmployee.type](mergedEmployee, true);

    await this.validateEmployee(preparedEmployee);

    const updateEmployeeObj = {
      ...employeeUpdate,
      ...additionalUpdates,
    };

    try {
      return await this.employeeRepository.update(employeeId, updateEmployeeObj);
    } catch (e) {
      if (e.code === 11000) {
        throw new InvalidFormatError({ message: `invalid.employee.${e.key}.already.exists` });
      }

      throw e;
    }
  }

  /**
   * @deleteById
   */
  async deleteById(employeeId) {
    const deleted = await this.employeeRepository.deleteById(employeeId);

    if (!deleted) {
      throw new NotFoundError({ message: 'not.found.employee' });
    }

    return deleted;
  }

  async validateEmployee(employee) {
    if (!Employee.schema.path('type')
      .enumValues
      .includes(employee.type)) {
      throw new InvalidFormatError({ message: 'invalid.employee.type' });
    }

    if (employee.type === EMPLOYEE_TYPE_CONTRACTOR && !employee.contract_duration) {
      throw new RequiredPropertyError({ message: 'required.employee.contract_duration' });
    }

    if (employee.type === EMPLOYEE_TYPE_EMPLOYEE && !employee.role) {
      throw new RequiredPropertyError({ message: 'required.employee.role' });
    }

    if (employee.role) {
      let roleObjectId;

      try {
        roleObjectId = new ObjectId(employee.role);
      } catch (e) {
        throw new InvalidFormatError({ message: 'invalid.employee.role' });
      }

      const roleExists = await this.roleService.retrieveById(roleObjectId);
      if (!roleExists) {
        throw new InvalidFormatError({ message: 'invalid.employee.role.doesnt.exist' });
      }
    }

    if (employee.tags) {
      const tagsObjectIds = [];

      try {
        // eslint-disable-next-line no-restricted-syntax
        for (const tag of employee.tags) {
          tagsObjectIds.push(new ObjectId(tag));
        }
      } catch (e) {
        throw new InvalidFormatError({ message: 'invalid.employee.tags' });
      }

      const tagsExists = await this.tagService.retrieveManyById(tagsObjectIds);

      if (tagsExists.length !== tagsObjectIds.length) {
        throw new InvalidFormatError({ message: 'invalid.employee.tag.doesnt.exist' });
      }
    }
  }
}

module.exports = EmployeeService;
