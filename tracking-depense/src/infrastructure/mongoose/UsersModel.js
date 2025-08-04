const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  firstName: String,
  email:String,
  password: String,
  accounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  }],

  expenses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Expense'
  }],

  incomes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Income'
  }],

  financialGoals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FinancialGoal'
  }],

  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
    required: false 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);