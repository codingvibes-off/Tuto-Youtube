const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member'
      },
      joinedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],

  currency: {
    type: String,
    default: 'EUR',
    uppercase: true
  },

  color: {
    type: String,
    default: '#0077cc'
  },

  icon: {
    type: String,
    default: '👥'
  },

  isArchived: {
    type: Boolean,
    default: false
  }

}, {
  timestamps: true // createdAt et updatedAt
});

module.exports = mongoose.model('Group', GroupSchema);
