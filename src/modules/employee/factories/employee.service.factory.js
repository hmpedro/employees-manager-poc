const EmployeeService = require('../employee.service');
const EmployeeRepository = require('../employee.repository');
const { roleServiceFactory } = require('../../role/factories/role.service.factory');
const { tagServiceFactory } = require('../../tag/factories/tag.service.factory');

const employeeRepository = new EmployeeRepository();
const roleService = roleServiceFactory();
const tagService = tagServiceFactory();

exports.employeeServiceFactory = () => new EmployeeService({ employeeRepository, roleService, tagService });
