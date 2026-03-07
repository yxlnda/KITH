// models/Memory.js
const mongoose = require('mongoose');

const memorySchema = new mongoose.Schema({
  pairingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pairing', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  type: { type: String, enum: ['Photo', 'Audio', 'Text'], required: true },
  mediaUrl: { type: String }, // The cloud storage link
  
  // Requirement: Metadata for Audio Processing
  narrationType: { type: String, enum: ['User', 'AI', 'None'], default: 'None' },
  transcript: { type: String }, // Optional: if you add speech-to-text later
  
  // Requirement: Categorization Engine
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Memory', memorySchema);