const express = require('express');
const router = express.Router();
const { generateCode, scanPatientCode, verifyCaregiverCode } = require('../controllers/pairingController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Anyone who is logged in can generate a code to be scanned
router.get('/generate-code', protect, generateCode);

// Phase 1: Only Caregivers are allowed to scan a Patient
router.post('/scan-patient', protect, authorize('Caregiver'), scanPatientCode);

// Phase 2: Only Patients are allowed to scan a Caregiver to finish the process
router.post('/verify-caregiver', protect, authorize('Patient'), verifyCaregiverCode);

module.exports = router;