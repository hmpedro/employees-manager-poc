const Tag = require('./tag.model');
const DatabaseError = require('../../utils/errors/database.error');

/**
 * @typedef TagRepository
 */
class TagRepository {
  /**
   * @retrieve
   */
  async retrieve(filters = {}) {
    try {
      const filtersToMongo = this.buildMongoFilters(filters);
      return await Tag.find(filtersToMongo)
        .select({ __v: false })
        .exec();
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  /**
   * @retrieveById
   */
  async retrieveById(tagId) {
    try {
      const tag = await Tag.findById(tagId);
      delete tag?.__v;
      return tag;
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  /**
   * @retrieveManyById
   */
  async retrieveManyById(tagsObjectIds) {
    try {
      const tags = await Tag.find({
        _id: { $in: tagsObjectIds },
      });

      // eslint-disable-next-line no-restricted-syntax
      for (const tag of tags) {
        delete tag.__v;
      }

      return tags;
    } catch (e) {
      throw new DatabaseError({ message: e.message });
    }
  }

  /**
   * @create
   */
  async create(tagObj) {
    try {
      const insertedTag = await Tag.create(tagObj);
      const tag = insertedTag.toJSON();
      delete tag.__v;
      return tag;
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
  async update(tagId, tagObj) {
    try {
      const updatedTag = await Tag.findOneAndUpdate({ _id: tagId }, tagObj, { new: true });
      const tag = updatedTag.toJSON();
      delete tag.__v;
      return tag;
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
  async deleteById(tagId) {
    try {
      const deletedObj = await Tag.deleteOne({
        _id: tagId,
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
      builded.title = {
        $regex: `.*${title}.*`,
        $options: 'i',
      };
    }

    return builded;
  }
}

module.exports = TagRepository;
