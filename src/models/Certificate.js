import mongoose from 'mongoose';

const CertificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: String,
  issuer: String,
  description: String,
  date: String,
  duration: String,
  imageUrl: String,
  certificateUrl: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Certificate || mongoose.model('Certificate', CertificateSchema);
