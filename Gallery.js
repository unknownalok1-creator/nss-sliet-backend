const mongoose = require('mongoose');

const GalleryAlbumSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  coverUrl: { type: String, default: '' },
  category: { type: String, default: 'General' },
  photosCount: { type: Number, default: 0 },
  videosCount: { type: Number, default: 0 },
  createdAt: { type: String, default: '' },
  location: { type: String, default: 'Campus' }
}, { timestamps: true });

const GalleryMediaSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  albumId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  type: { type: String, enum: ['photo', 'video', 'youtube'], default: 'photo' },
  url: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  category: { type: String, default: 'General' },
  uploadedBy: { type: String, required: true },
  uploadedAt: { type: String, default: '' }
}, { timestamps: true });

const Album = mongoose.models.Album || mongoose.model('Album', GalleryAlbumSchema);
const Media = mongoose.models.Media || mongoose.model('Media', GalleryMediaSchema);

module.exports = { Album, Media };
