import mongoose, { Schema } from 'mongoose';
import WordList from './WordList';
import DateCheckSchema from './DateChecker';
import { IBaseSchema, RequestWithUser } from '../types/types';
import DateChecker from './DateChecker';

export type IWord = IBaseSchema & {
  word: string;
  definition: string;
  context: string;
  synonyms: string[];
  saveWithContext: (req: RequestWithUser, newWord: IWord) => Promise<void>;
};

const wordSchema: Schema<IWord> = new Schema({
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

wordSchema.methods.saveWithContext = async function (
  req: RequestWithUser,
  newWord: IWord,
) {
  await this.save();

  const userId = req.user;
  const wordList = await WordList.findOne({ userId });
  if (wordList) {
    wordList.words.push(newWord);
    await wordList.save();
  } else {
    const newWordList = new WordList({ userId: userId, words: [newWord] });
    await newWordList.save();
  }

  const newDateChecker = new DateCheckSchema({
    userId: userId,
    wordId: newWord._id,
  });

  await newDateChecker.save();
};

wordSchema.methods.deleteById = async function (id: string) {
  await this.deleteOne();
  await DateChecker.findOneAndDelete({ wordId: id });
};

export default mongoose.model('Word', wordSchema);
