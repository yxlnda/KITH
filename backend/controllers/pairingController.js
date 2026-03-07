const jwt = require('jsonwebtoken');
const Pairing = require('../models/Pairing');
const User = require('../models/User');

// Generate a short-lived QR Code ID (expires in 5 minutes)
exports.generateCode = (req, res) => {
  const code = jwt.sign(
    { id: req.user.id, role: req.user.role },
    'YOUR_JWT_SECRET', 
    { expiresIn: '5m' }
  );
  res.json({ code });
};

// Phase 1: Caregiver scans the Patient's code
exports.scanPatientCode = async (req, res) => {
  const { scannedCode } = req.body;
  
  try {
    const decoded = jwt.verify(scannedCode, 'YOUR_JWT_SECRET');
    
    if (decoded.role !== 'Patient') {
      return res.status(400).json({ message: 'Invalid code: Please scan a patient code.' });
    }

    // Create a pending link between the two accounts
    let pairing = await Pairing.findOne({ patient: decoded.id, caregiver: req.user.id });
    if (!pairing) {
      pairing = await Pairing.create({ patient: decoded.id, caregiver: req.user.id, status: 'Pending' });
    }

    res.json({ message: 'Phase 1 complete. Waiting for patient to scan your code.', pairingId: pairing._id });
  } catch (error) {
    res.status(400).json({ message: 'Code expired or invalid. Please generate a new one.' });
  }
};

// Phase 2: Patient scans the Caregiver's code
exports.verifyCaregiverCode = async (req, res) => {
  const { scannedCode } = req.body;

  try {
    const decoded = jwt.verify(scannedCode, 'YOUR_JWT_SECRET');

    if (decoded.role !== 'Caregiver') {
      return res.status(400).json({ message: 'Invalid code: Please scan a caregiver code.' });
    }

    // Find the pending link created in Phase 1
    const pairing = await Pairing.findOne({ patient: req.user.id, caregiver: decoded.id, status: 'Pending' });
    
    if (!pairing) {
      return res.status(404).json({ message: 'No pending connection found. Caregiver must scan your code first.' });
    }

    // Finalize the sync
    pairing.status = 'Active';
    await pairing.save();

    // Update both user accounts to show they are paired
    await User.findByIdAndUpdate(req.user.id, { pairedWith: decoded.id });
    await User.findByIdAndUpdate(decoded.id, { pairedWith: req.user.id });

    res.json({ message: 'Sync complete. Accounts are successfully connected.' });
  } catch (error) {
    res.status(400).json({ message: 'Code expired or invalid. Please generate a new one.' });
  }
};