// routes/scheduleRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createSchedule, getSchedules, deleteSchedule } = require('../controllers/scheduleController');

router.use(protect);

router.post('/', createSchedule);
router.get('/', getSchedules);
router.delete('/:id', deleteSchedule);

module.exports = router;