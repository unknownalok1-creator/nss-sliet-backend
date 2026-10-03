const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Event = require('./models/Event');
const AuditLog = require('./models/AuditLog');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nss_portal';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding leadership accounts...');

    // Clear collections
    await User.deleteMany({});
    await Event.deleteMany({});
    await AuditLog.deleteMany({});

    // Permanent Leadership Accounts saved directly in MongoDB
    const permanentUsers = [
      {
        id: 'perm_sa_001',
        name: 'Alok Kumar',
        email: 'alok.kumar@nssindia.gov.in',
        phone: '+91 98765 00001',
        role: 'SUPER_ADMIN',
        nssId: 'NSS-SA-001',
        unitId: 'all',
        unitName: 'Directorate Level',
        groupId: 'all',
        groupName: 'All Units & Colleges',
        department: 'State NSS Directorate',
        course: 'National Directorate',
        year: 'Campus Director',
        attendancePercentage: 100.0,
        totalServiceHours: 0,
        eventsAttended: 0,
        certificatesCount: 0
      },
      {
        id: 'perm_ca_001',
        name: 'Principal / Dean (College Admin)',
        email: 'principal@college.edu',
        phone: '+91 98765 00002',
        role: 'COLLEGE_ADMIN',
        nssId: 'NSS-CA-001',
        unitId: 'all',
        unitName: 'College Campus',
        groupId: 'all',
        groupName: 'All Groups',
        department: 'Dean of Student Affairs',
        course: 'Campus Leadership',
        year: 'Principal Admin',
        attendancePercentage: 100.0,
        totalServiceHours: 0,
        eventsAttended: 0,
        certificatesCount: 0
      },
      {
        id: 'perm_po_001',
        name: 'Programme Officer (Faculty Head)',
        email: 'po@college.edu',
        phone: '+91 98765 00003',
        role: 'PROGRAMME_OFFICER',
        nssId: 'NSS-PO-001',
        unitId: 'all',
        unitName: 'All Units (College Wide)',
        groupId: 'all',
        groupName: 'All Groups',
        department: 'NSS Faculty Advisor',
        course: 'Programme Officer',
        year: 'Faculty Head',
        attendancePercentage: 100.0,
        totalServiceHours: 0,
        eventsAttended: 0,
        certificatesCount: 0
      }
    ];

    await User.insertMany(permanentUsers);

    // Initial Audit Log
    const initLog = new AuditLog({
      id: 'log_01',
      performedBy: 'Alok Kumar',
      role: 'Faculty Coordinator',
      action: 'MONGODB_LEADERSHIP_INITIALIZED',
      target: 'Permanent Leadership Accounts Stored in Database',
      previousValue: 'None',
      newValue: 'Faculty Coordinator (Alok Kumar), College Admin, PO Saved',
      timestamp: new Date().toISOString()
    });
    await initLog.save();

    console.log('✅ Permanent leadership accounts (Alok Kumar - Faculty Coordinator, College Admin, PO) saved to MongoDB Atlas!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding Error:', err);
    process.exit(1);
  }
}

seedDatabase();
