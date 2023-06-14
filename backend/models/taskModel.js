const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  task_id: {
    type: Number,
    required: true,
  },
  project_id: {
    type: Number,
    required: true,
  },
  task_name: {
    type: String,
    required: true,
  },
  task_description: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  deadline: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Task', taskSchema);
