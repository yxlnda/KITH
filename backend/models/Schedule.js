// models/Schedule.js
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  pairingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pairing', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  
  title: { type: String, required: true }, // e.g., "Take Blood Pressure Pill" or "Look at Photo Album"
  type: { type: String, enum: ['Medication', 'Activity'], required: true },
  
  // Storing time in "HH:mm" format (24-hour)
  time: { type: String, required: true }, 
  
  // Array of days it should repeat (0 = Sunday, 1 = Monday, etc.)
  days: [{ type: Number, required: true }], 
  
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Schedule', scheduleSchema);