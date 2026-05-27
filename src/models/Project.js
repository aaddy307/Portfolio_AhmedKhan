import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  longDescription: String,
  tags: [String],
  category: [String],
  githubUrl: String,
  figmaUrl: String,
  liveUrl: String,
  imageUrl: String,
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);
