const Ajv = require('ajv');
const { ObjectId } = require('mongoose').Types;
const RoleController = require('../role.controller');
const { roleServiceFactory } = require('./role.service.factory');

const roleService = roleServiceFactory();

const ajv = new Ajv({ coerceTypes: true });

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
    title: { type: 'string' },
  },
};

const retrieveByIdSchema = {
  type: 'object',
  properties: {
    roleId: { type: 'string', objectId: true },
  },
  required: ['roleId'],
};

const createSchema = {
  type: 'object',
  properties: {
    title: { type: 'string' },
  },
  required: ['title'],
};

const updateSchema = {
  type: 'object',
  properties: {
    roleId: {
      type: 'string',
      objectId: true,
    },
    title: { type: 'string' },
  },
  required: ['roleId', 'title'],
};

const roleValidator = {
  retrieve: ajv.compile(retrieveFilterSchema),
  retrieveById: ajv.compile(retrieveByIdSchema),
  create: ajv.compile(createSchema),
  update: ajv.compile(updateSchema),
};

exports.roleControllerFactory = () => new RoleController({ roleService, roleValidator });
