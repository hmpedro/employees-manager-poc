const Ajv = require('ajv');
const { ObjectId } = require('mongoose').Types;
const TagController = require('../tag.controller');
const { tagServiceFactory } = require('./tag.service.factory');

const tagService = tagServiceFactory();

const ajv = new Ajv({ coerceTypes: true });

ajv.addKeyword('objectId', {
  validate: function validate(data, dataPath) {
    try {
      new ObjectId(dataPath);
      return true;
    } catch (e) {
      validate.errors = [{
        keyword: 'id',
        message: 'invalid id',
        params: { keyword: 'id' },
      }];
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
    tagId: {
      type: 'string',
      objectId: true,
    },
  },
  required: ['tagId'],
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
    tagId: {
      type: 'string',
      objectId: true,
    },
    title: { type: 'string' },
  },
  required: ['tagId', 'title'],
};

const tagValidator = {
  retrieve: ajv.compile(retrieveFilterSchema),
  retrieveById: ajv.compile(retrieveByIdSchema),
  create: ajv.compile(createSchema),
  update: ajv.compile(updateSchema),
};

exports.tagControllerFactory = () => new TagController({
  tagService,
  tagValidator,
});
