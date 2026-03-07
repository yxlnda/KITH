// models/Category.js
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  colorHex: { type: String, default: '#FFFFFF' },
  // Links the category to the specific patient-caregiver pair
  pairingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pairing', required: true }
});

module.exports = mongoose.model('Category', categorySchema);