const mongoose = require('mongoose');

const FinancialGoalSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },

  description: {
    type: String,
    trim: true
  },

  targetAmount: {
    type: Number,
    required: true
  },

  currentAmount: {
    type: Number,
    default: 0
  },

  deadline: {
    type: Date
  },

  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },

  type: {
    type: String,
    enum: ['saving', 'debt', 'investment', 'other'],
    default: 'saving'
  },

  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled'],
    default: 'active'
  },

  color: {
    type: String,
    default: '#008000'
  },

  icon: {
    type: String,
    default: '🎯'
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('FinancialGoals', FinancialGoalSchema);
