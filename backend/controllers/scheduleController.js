// controllers/scheduleController.js
const Schedule = require('../models/Schedule');

exports.createSchedule = async (req, res) => {
  const { title, type, time, days } = req.body;

  try {
    const schedule = await Schedule.create({
      pairingId: req.user.pairedWith,
      createdBy: req.user.id,
      title,
      type,
      time,
      days
    });
    res.status(201).json(schedule);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create schedule' });
  }
};

exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find({ pairingId: req.user.pairedWith }).sort({ time: 1 });
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch schedules' });
  }
};

exports.deleteSchedule = async (req, res) => {
  try {
    await Schedule.findOneAndDelete({ _id: req.params.id, pairingId: req.user.pairedWith });
    res.json({ message: 'Schedule removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete schedule' });
  }
};