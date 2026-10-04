const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  nssId: { type: String, required: true },
  certificateType: { type: String, required: true },
  eventTitle: { type: String, required: true },
  issuedBy: { type: String, required: true },
  issuedAt: { type: String, required: true },
  verificationCode: { type: String, required: true, unique: true },
  serviceHoursCredited: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
