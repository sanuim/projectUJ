const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  project_id: {
    type: Number,
    required: true,
  },
  project_name: {
    type: String,
    required: true,
  },
  project_description: {
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
});

module.exports = mongoose.model('Project', projectSchema);
