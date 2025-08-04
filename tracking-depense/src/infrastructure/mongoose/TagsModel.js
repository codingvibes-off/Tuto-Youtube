const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,      // Un tag ne doit pas être dupliqué
    trim: true,
    lowercase: true    // pour éviter les doublons à cause de la casse
  },

  description: {
    type: String,
    trim: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',       // Optionnel : qui a créé le tag
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Tag', TagSchema);
