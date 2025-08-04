const mongoose = require('mongoose');

const IncomeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },

  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },

  amount: {
    type: Number,
    required: true
  },

  source: {
    type: String,
    required: true,
    trim: true
  },

  category: {
    type: String,
    enum: ['Salaire', 'Aide', 'Remboursement', 'Investissement', 'Autre'],
    default: 'Autre'
  },

  receivedAt: {
    type: Date,
    default: Date.now
  },

  notes: {
    type: String,
    trim: true
  },

  recurring: {
    type: Boolean,
    default: false
  },

  recurrence: {
    type: String,
    enum: ['mensuel', 'hebdomadaire', 'annuel', null],
    default: null
  },

  attachments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attachment' // si tu gères des justificatifs
    }
  ]
}, {
  timestamps: true // createdAt, updatedAt
});

module.exports = mongoose.model('Income', IncomeSchema);
