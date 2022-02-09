const TagService = require('../tag.service');
const TagRepository = require('../tag.repository');

const tagRepository = new TagRepository();

exports.tagServiceFactory = () => new TagService({ tagRepository });
