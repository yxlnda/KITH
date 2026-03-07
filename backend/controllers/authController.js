const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, 'YOUR_JWT_SECRET', { expiresIn: '30d' });
};

// Register User
exports.registerUser = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ fullName, email, password: hashedPassword, role });
  res.status(201).json({
    _id: user._id,
    token: generateToken(user._id, user.role)
  });
};

// Standard Login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ _id: user._id, token: generateToken(user._id, user.role), role: user.role });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Requirement: Biometric Token Handling
exports.verifyBiometric = async (req, res) => {
  const { email, deviceToken } = req.body;
  const user = await User.findOne({ email });

  // In this logic, we verify the token sent by the mobile app 
  // matches the one stored during the first biometric setup.
  if (user && user.biometricToken === deviceToken) {
    res.json({
      _id: user._id,
      token: generateToken(user._id, user.role),
      role: user.role
    });
  } else {
    res.status(401).json({ message: 'Biometric verification failed' });
  }
};