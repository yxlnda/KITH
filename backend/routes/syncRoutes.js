const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { syncMemories } = require('../controllers/syncController');

// Require authentication to sync
router.get('/memories', protect, syncMemories);

module.exports = router;