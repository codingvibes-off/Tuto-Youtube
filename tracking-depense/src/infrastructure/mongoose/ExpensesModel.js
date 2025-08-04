const mongoose = require('mongoose');


const expenseSchema = new mongoose.Schema({
  amount: Number,
  date: Date,
  description: String,

  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', 
    required: true
  },

  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },

  tagIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag'
  }],

  receiptUrl: String,

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
