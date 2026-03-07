const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Patient', 'Caregiver'], required: true },
  
  // Requirement: Biometric Token Handling
  // Stores the public key or token ID from the device
  biometricToken: { type: String, default: null },
  
  // Pairing logic for sync
  pairedWith: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);