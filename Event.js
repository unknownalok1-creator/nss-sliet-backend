const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: 'NSS Activity Drive' },
  date: { type: String, required: true },
  startTime: { type: String, default: '09:00 AM' },
  endTime: { type: String, default: '01:00 PM' },
  location: { type: String, default: 'Campus Ground' },
  organizerName: { type: String, default: 'NSS Coordinator' },
  collegeId: { type: String, default: 'col_001' },
  unitId: { type: String, default: 'unit_01' },
  capacity: { type: Number, default: 100 },
  registeredCount: { type: Number, default: 0 },
  serviceHours: { type: Number, default: 4 },
  category: { type: String, default: 'Community Service' },
  status: { type: String, default: 'UPCOMING' },
  registeredUserIds: { type: [String], default: [] },
  imageUrl: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.models.Event || mongoose.model('Event', EventSchema);
