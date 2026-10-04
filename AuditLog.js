const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  performedBy: { type: String, required: true },
  role: { type: String, required: true },
  action: { type: String, required: true },
  target: { type: String, required: true },
  previousValue: { type: String, default: 'None' },
  newValue: { type: String, default: 'Updated' },
  timestamp: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);
