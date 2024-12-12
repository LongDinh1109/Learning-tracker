import mongoose, { Schema } from 'mongoose';
import { IWord } from './Word';
export type IWordList = Document & {
  userId: string;
  words: IWord[];
};

const wordListSchema: Schema<IWordList> = new Schema({
  userId: {
    type: String,
    required: true,
  },
  words: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Word',
    },
  ],
});

export default mongoose.model('WordList', wordListSchema);