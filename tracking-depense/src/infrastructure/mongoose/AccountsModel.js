const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['bank', 'cash', 'credit', 'investment', 'other'],
    default: 'other',
  },
  initialBalance: {
    type: Number,
    default: 0,
  },
  currentBalance: {
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    default: 'EUR',
    uppercase: true,
  },
  institutionName: {
    type: String,
    trim: true,
  },
  iban: {
    type: String,
    trim: true,
  },
  cardLast4: {
    type: String,
    trim: true,
    maxlength: 4,
  },
  color: {
    type: String,
    default: '#000000',
  },
  icon: {
    type: String,
    default: '💰',
  },
  archived: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true 
});

module.exports = mongoose.model('Account', AccountSchema);
