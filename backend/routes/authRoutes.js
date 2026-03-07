const express = require('express');
const router = express.Router();
const { registerUser, loginUser, verifyBiometric } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/biometric-verify', verifyBiometric);

module.exports = router;