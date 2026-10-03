// Global Error Handlers to prevent Node.js from exiting on Render
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err.stack || err.message || err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

try {
  require('dotenv').config();
} catch (e) {
  console.log('dotenv notice: Environment variables loaded directly from host.');
}

// Robust Case-Insensitive Model Importer for Linux Containers (Render/Railway)
function safeRequireModel(modelName) {
  try {
    return require(`./models/${modelName}`);
  } catch (e1) {
    try {
      return require(`./models/${modelName.toLowerCase()}`);
    } catch (e2) {
      try {
        return require(`./models/${modelName.charAt(0).toUpperCase() + modelName.slice(1)}`);
      } catch (e3) {
        console.error(`⚠️ Model file '${modelName}' not found in ./models/ folder.`);
        throw e1;
      }
    }
  }
}

const User = safeRequireModel('User');
const Event = safeRequireModel('Event');
const Attendance = safeRequireModel('Attendance');
const Announcement = safeRequireModel('Announcement');
const Certificate = safeRequireModel('Certificate');
const { Album, Media } = safeRequireModel('Gallery');
const ChatMessage = safeRequireModel('Chat');
const AuditLog = safeRequireModel('AuditLog');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/nss_portal';

// Middleware
app.use(cors());
app.use(express.json());

// Root Health Endpoint for Render Health Check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'NSS Sliet MongoDB API Server is Live!' });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', database: 'MongoDB', app: 'NSS Sliet' });
});

// USERS / VOLUNTEERS
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const filter = { id: req.body.id };
    const update = req.body;
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    const user = await User.findOneAndUpdate(filter, update, options);
    res.status(200).json(user);
  } catch (err) {
    console.error('Error saving user to MongoDB:', err.message);
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ id: req.params.id });
    if (!result) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// EVENTS
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const result = await Event.findOneAndDelete({ id: req.params.id });
    if (!result) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ATTENDANCE
app.get('/api/attendance', async (req, res) => {
  try {
    const records = await Attendance.find().sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/attendance', async (req, res) => {
  try {
    const record = new Attendance(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put('/api/attendance/:id', async (req, res) => {
  try {
    const updated = await Attendance.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ANNOUNCEMENTS
app.get('/api/announcements', async (req, res) => {
  try {
    const list = await Announcement.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/announcements', async (req, res) => {
  try {
    const announcement = new Announcement(req.body);
    await announcement.save();
    res.status(201).json(announcement);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// CERTIFICATES
app.get('/api/certificates', async (req, res) => {
  try {
    const list = await Certificate.find().sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/certificates', async (req, res) => {
  try {
    const cert = new Certificate(req.body);
    await cert.save();
    res.status(201).json(cert);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// CHAT MESSAGES
app.get('/api/chats/messages', async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/chats/messages', async (req, res) => {
  try {
    const msg = new ChatMessage(req.body);
    await msg.save();
    res.status(201).json(msg);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete('/api/chats/messages/:id', async (req, res) => {
  try {
    const result = await ChatMessage.findOneAndDelete({ id: req.params.id });
    if (!result) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GALLERY ALBUMS
app.get('/api/gallery-albums', async (req, res) => {
  try {
    const albums = await Album.find().sort({ createdAt: -1 });
    res.json(albums);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/gallery-albums', async (req, res) => {
  try {
    const album = new Album(req.body);
    await album.save();
    res.status(201).json(album);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GALLERY MEDIA
app.get('/api/gallery-media', async (req, res) => {
  try {
    const mediaList = await Media.find().sort({ createdAt: -1 });
    res.json(mediaList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/gallery-media', async (req, res) => {
  try {
    const media = new Media(req.body);
    await media.save();
    res.status(201).json(media);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// AUDIT LOGS
app.get('/api/audit-logs', async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/audit-logs', async (req, res) => {
  try {
    const log = new AuditLog(req.body);
    await log.save();
    res.status(201).json(log);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start Server FIRST so Render Health Check passes immediately
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 NSS Sliet MongoDB Server listening on port ${PORT}`);

  if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI)
      .then(async () => {
        console.log('✅ Connected to MongoDB Database successfully');

        try {
          const userCount = await User.countDocuments();
          if (userCount === 0) {
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
            console.log('✅ Auto-seeded permanent leadership accounts in MongoDB!');
          }
        } catch (e) {
          console.error('Auto-seed notice:', e.message);
        }
      })
      .catch(err => console.error('❌ MongoDB Connection Warning:', err.message));
  }
});
