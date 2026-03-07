// services/notificationService.js
const cron = require('node-cron');
const admin = require('firebase-admin');
const Schedule = require('../models/Schedule');
const User = require('../models/User');

// Note: You will need to download your Firebase Admin SDK private key 
// and save it as 'firebase-service-account.json' in your backend folder later.
try {
  const serviceAccount = require('../firebase-service-account.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('✅ Firebase Admin Initialized');
} catch (error) {
  console.log('⚠️ Firebase not initialized. Add firebase-service-account.json to enable push alerts.');
}

const sendPushNotification = async (token, title, body) => {
  if (!token) return;
  try {
    await admin.messaging().send({
      token: token,
      notification: { title, body }
    });
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};

// Requirement: Alert Customization (Task Scheduler)
exports.startCronJobs = () => {
  // This cron job runs every single minute
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const currentHourMinute = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    const currentDay = now.getDay();

    try {
      // Find all active schedules that match the current time and day
      const activeSchedules = await Schedule.find({
        isActive: true,
        time: currentHourMinute,
        days: currentDay
      }).populate('pairingId');

      for (const schedule of activeSchedules) {
        // Find the users associated with this pairing to alert them
        const patient = await User.findById(schedule.pairingId.patient);
        const caregiver = await User.findById(schedule.pairingId.caregiver);

        // Requirement: Push Notification Service
        if (patient && patient.fcmToken) {
          sendPushNotification(patient.fcmToken, `Reminder: ${schedule.type}`, schedule.title);
        }
        if (caregiver && caregiver.fcmToken) {
          sendPushNotification(caregiver.fcmToken, `Patient Reminder: ${schedule.type}`, `It is time for: ${schedule.title}`);
        }
      }
    } catch (error) {
      console.error('Scheduler Error:', error);
    }
  });
  
  console.log('🕒 Task Scheduler is running...');
};