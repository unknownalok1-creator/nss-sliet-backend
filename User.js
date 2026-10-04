const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  photoUrl: { type: String, default: '' },
  collegeId: { type: String, default: 'col_001' },
  collegeName: { type: String, default: 'Government Engineering College' },
  unitId: { type: String, default: 'unit_01' },
  unitName: { type: String, default: 'NSS Unit 1' },
  groupId: { type: String, default: 'group_a' },
  groupName: { type: String, default: 'Group A' },
  role: {
    type: String,
    enum: ['SUPER_ADMIN', 'COLLEGE_ADMIN', 'PROGRAMME_OFFICER', 'STUDENT_COORDINATOR', 'BRANCH_HEAD', 'DOMAIN_HEAD', 'UNIT_COORDINATOR', 'CO_COORDINATOR', 'VOLUNTEER'],
    default: 'VOLUNTEER'
  },
  nssId: { type: String, required: true },
  department: { type: String, default: 'Computer Science' },
  course: { type: String, default: 'B.Tech' },
  year: { type: String, default: '1st Year' },
  isActive: { type: Boolean, default: true },
  isProfileCompleted: { type: Boolean, default: false },
  attendancePercentage: { type: Number, default: 0.0 },
  totalServiceHours: { type: Number, default: 0 },
  eventsAttended: { type: Number, default: 0 },
  certificatesCount: { type: Number, default: 0 },
  joinedDate: { type: String, default: () => new Date().toISOString().split('T')[0] }
}, { timestamps: true });

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
