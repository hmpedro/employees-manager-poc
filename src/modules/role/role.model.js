const mongoose = require('mongoose');

const { Schema } = mongoose;

const RoleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  collection: 'roles',
  timestamps: true,
});

const Role = mongoose.model('Role', RoleSchema);

module.exports = Role;
