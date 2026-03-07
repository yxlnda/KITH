// routes/memoryRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getUploadUrl, createMemory, getTimeline, createCategory } = require('../controllers/memoryController');

// All memory routes require the user to be logged in
router.use(protect);

router.post('/upload-url', getUploadUrl);
router.post('/', createMemory);
router.get('/timeline', getTimeline);
router.post('/categories', createCategory);

module.exports = router;