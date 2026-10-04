const mongoose = require('mongoose');

const ChatMessageSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  chatId: { type: String, required: true, default: 'group_unit_01' },
  senderId: { type: String, required: true },
  senderName: { type: String, required: true },
  senderRole: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: String, default: '' },
  isGroup: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.models.ChatMessage || mongoose.model('ChatMessage', ChatMessageSchema);
