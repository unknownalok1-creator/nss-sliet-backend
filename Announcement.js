const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorName: { type: String, required: true },
  authorRole: { type: String, required: true },
  targetAudience: { type: String, default: 'ALL' },
  date: { type: String, required: true },
  unitId: { type: String, default: 'all' },
  priority: { type: String, default: 'NORMAL' }
}, { timestamps: true });

module.exports = mongoose.models.Announcement || mongoose.model('Announcement', AnnouncementSchema);
