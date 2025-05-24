import mongoose from 'mongoose';

const EntrySchema = new mongoose.Schema({
  id: String,
  name: String,
  currentTime: String,
  extraData: { type: [String], default: [] }
});

export default mongoose.models.Entry || mongoose.model('Entry', EntrySchema);
