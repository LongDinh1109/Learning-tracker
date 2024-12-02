import mongoose,{ Schema } from 'mongoose';

export type IWord = Document & {
  word: string;
  definition: string;
  context: string;
  synonyms: string[];
};

const wordSchema : Schema<IWord>= new mongoose.Schema({
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
});

export default mongoose.model('Word', wordSchema);