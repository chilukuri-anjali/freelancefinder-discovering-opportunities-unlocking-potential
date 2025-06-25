const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Project title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Project description is required'],
    trim: true
  },
  budget: {
    type: Number,
    required: [true, 'Budget is required'],
    min: [0, 'Budget must be a positive number']
  },
  skillsRequired: {
    type: [String],
    required: [true, 'At least one skill is required'],
    validate: [array => array.length > 0, 'Skills array cannot be empty']
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Client reference is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
