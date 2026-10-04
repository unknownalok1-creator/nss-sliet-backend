const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  eventId: { type: String, required: true },
  eventTitle: { type: String, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  nssId: { type: String, required: true },
  unitId: { type: String, default: 'unit_01' },
  groupId: { type: String, default: 'group_a' },
  status: { type: String, enum: ['PRESENT', 'ABSENT', 'LATE', 'EXCUSED', 'PENDING'], default: 'PENDING' },
  creditedHours: { type: Number, default: 0 },
  markedBy: { type: String, default: 'Self Check-In' },
  markedAt: { type: String, default: '' },
  updatedAt: { type: String, default: '' },
  date: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);
