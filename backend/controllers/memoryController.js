// controllers/memoryController.js
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const Memory = require('../models/Memory');
const Category = require('../models/Category');
const Pairing = require('../models/Pairing');

// Configure Cloud Storage (e.g., AWS S3)
const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'ap-southeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Requirement: Cloud Storage Integration
exports.getUploadUrl = async (req, res) => {
  const { fileName, fileType } = req.body;
  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `memories/${Date.now()}-${fileName}`,
    ContentType: fileType,
  });

  try {
    // Generates a URL valid for 60 seconds
    const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 60 });
    res.json({ uploadUrl, fileKey: command.input.Key });
  } catch (error) {
    res.status(500).json({ message: 'Could not generate secure link' });
  }
};

// Requirement: Categorization & Timeline Engine
exports.createMemory = async (req, res) => {
  const { type, mediaUrl, narrationType, categoryId } = req.body;

  try {
    const memory = await Memory.create({
      pairingId: req.user.pairedWith, // Assumes user is already paired
      createdBy: req.user.id,
      type,
      mediaUrl,
      narrationType,
      category: categoryId
    });
    res.status(201).json(memory);
  } catch (error) {
    res.status(400).json({ message: 'Failed to save memory record' });
  }
};

// Retrieve memories with filtering by date and theme
exports.getTimeline = async (req, res) => {
  const { categoryId, startDate, endDate } = req.query;
  
  // Build the search filter based on what the app requests
  let filter = { pairingId: req.user.pairedWith };
  if (categoryId) filter.category = categoryId;
  if (startDate && endDate) {
    filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }

  try {
    const memories = await Memory.find(filter)
      .populate('category', 'name colorHex')
      .sort({ createdAt: -1 }); // Newest first
    res.json(memories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load timeline' });
  }
};

// Category Management
exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create({
      name: req.body.name,
      colorHex: req.body.colorHex,
      pairingId: req.user.pairedWith
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create category' });
  }
};