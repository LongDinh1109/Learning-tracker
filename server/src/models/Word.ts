import mongoose from 'mongoose';

const wordSchema = new mongoose.Schema({
  word: {
    type: String,
    required: true,
    unique: true,
  },
  definition: {
    type: String,
    required: false,
  },
  context: {
    type: String,
    required: false,
  },
  synonyms: {
    type: [String],
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Word', wordSchema);