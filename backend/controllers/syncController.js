const Memory = require('../models/Memory');

exports.syncMemories = async (req, res) => {
  // The mobile app sends the timestamp of its last successful sync
  const { lastSyncTimestamp } = req.query;
  const pairingId = req.user.pairedWith;

  try {
    let query = { pairingId };
    
    // If the device has synced before, only fetch records updated after that time
    if (lastSyncTimestamp) {
      query.updatedAt = { $gt: new Date(lastSyncTimestamp) };
    }

    const newOrUpdatedMemories = await Memory.find(query).sort({ updatedAt: 1 });
    
    res.json({
      success: true,
      data: newOrUpdatedMemories,
      // The app will save this new timestamp for its next sync request
      currentTimestamp: new Date() 
    });
  } catch (error) {
    res.status(500).json({ message: 'Sync failed' });
  }
};