const Ajv = require('ajv');
const { ObjectId } = require('mongoose').Types;
const EmployeeController = require('../employee.controller');
const { employeeServiceFactory } = require('./employee.service.factory');
const Employee = require('../employee.model');

const employeeService = employeeServiceFactory();

const ajv = new Ajv({ coerceTypes: true });

ajv.addKeyword('tagsObjectId', {
  validate: function validate(data, dataPath) {
    try {
      new ObjectId(dataPath);
      return true;
    } catch (e) {
      validate.errors = [{ keyword: 'tags', message: 'invalid id', params: { keyword: 'tags' } }];
      return false;
    }
  },
  errors: true,
});

ajv.addKeyword('objectId', {
  validate: function validate(data, dataPath) {
    try {
      new ObjectId(dataPath);
      return true;
    } catch (e) {
      validate.errors = [{ keyword: 'id', message: 'invalid id', params: { keyword: 'id' } }];
      return false;
    }
  },
  errors: true,
});

const retrieveFilterSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    tags: { type: 'array', items: { type: 'string', tagsObjectId: true }, uniqueItems: true },
  },
};

const retrieveByIdSchema = {
  type: 'object',
  properties: {
    employeeId: { type: 'string', objectId: true },
  },
  required: ['employeeId'],
};

const createSchema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    type: { enum: Employee.schema.path('type').enumValues },
    contract_duration: { type: 'integer', minimum: 1 },
    role: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' }, uniqueItems: true },
  },
  required: ['name', 'type'],
};

const updateSchema = {
  type: 'object',
  properties: {
    employeeId: { type: 'string', objectId: true },
    name: { type: 'string' },
    type: { enum: Employee.schema.path('type').enumValues },
    contract_duration: { type: 'integer', minimum: 1 },
    role: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' }, uniqueItems: true },
  },
  required: ['employeeId'],
};

const employeeValidator = {
  retrieve: ajv.compile(retrieveFilterSchema),
  retrieveById: ajv.compile(retrieveByIdSchema),
  create: ajv.compile(createSchema),
  update: ajv.compile(updateSchema),
};

exports.employeeControllerFactory = () => new EmployeeController({ employeeService, employeeValidator });
