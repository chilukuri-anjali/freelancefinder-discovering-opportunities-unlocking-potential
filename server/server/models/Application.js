const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Freelancer ID is required'],
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: [true, 'Project ID is required'],
  },
  proposalText: {
    type: String,
    required: [true, 'Proposal text is required'],
    trim: true
  },
  proposedRate: {
    type: Number,
    required: [true, 'Proposed rate is required'],
    min: [0, 'Proposed rate must be a positive number']
  },
  portfolioLink: {
    type: String,
    trim: true
    // You can also validate URL format using a RegExp or external library if needed
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
