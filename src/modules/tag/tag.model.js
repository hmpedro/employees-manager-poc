const mongoose = require('mongoose');

const { Schema } = mongoose;

const TagSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  collection: 'tags',
  timestamps: true,
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
