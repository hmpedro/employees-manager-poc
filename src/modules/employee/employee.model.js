const mongoose = require('mongoose');

const { Schema } = mongoose;

const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['employee', 'contractor'],
  },
  contract_duration: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value',
    },
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: 'Role',
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
  }],
}, {
  collection: 'employees',
  timestamps: true,
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;
