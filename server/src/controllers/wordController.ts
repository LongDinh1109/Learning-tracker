import { Request, Response } from 'express';
import Word from '../models/Word';
import { errorHandler } from '../utils/errorHandler';
import WordList from '../models/WordList';
import { RequestWithUser } from '../types/types';

export const getAllWords = async (req: Request, res: Response) => {
  try {
    const words = await Word.find();
    res.status(200).json(words);
  } catch (err) {
    errorHandler(err, res, 500);
  }
};

export const getWordsByUser = async (req: RequestWithUser, res: Response) => {
  try {
    const userId = req.user;
    console.log(userId);
    
    const wordList = await WordList.findOne({ userId });
    if (!wordList) {
      return res.status(404).json({ message: 'WordList not found' });
    }
    const words = await Word.find({ _id: { $in: wordList.words } });
    console.log(words);
    
    res.status(200).json(words);
  } catch (err) {
    errorHandler(err, res, 500);
  }
};

export const addNewWord = async (req: RequestWithUser, res: Response) => {
  try {
    const { word, definition, context, synonyms } = req.body;
    const newWord = new Word({ word, definition, context, synonyms });
  
    await newWord.saveWithContext(req,newWord);
    res.status(201).json(newWord);
  } catch (err) {    
    errorHandler(err, res, 400);
  }
};

export const deleteWord = async (req: RequestWithUser, res: Response) => {
  try {
    const wordId = req.params.id;
    const deletedWord = await Word.findById(wordId);
    const wordList = await WordList.findOne({ userId: req.user });
    if (!deletedWord || !wordList) {
      return res.status(404).json({ message: 'Word not found' });
    }
    wordList.words = wordList.words.filter(
      (word : object) => word.toString() !== wordId
    );
    await wordList.save();
    
    await deletedWord.deleteById(wordId);

    return res.status(200).json({ message: 'Word deleted successfully' });
  } catch (err) {
    console.log(err);
    
    errorHandler(err, res, 500);
  }
};

export const updateWord = async (req: Request, res: Response) => {
  const wordId = req.params.id;
  const { word, definition, context, synonyms } = req.body;
  try {
    const updatedWord = await Word.findById(wordId);
    if (!updatedWord) {
      return res.status(404).json({ message: 'Word not found' });
    } else {
      updatedWord.word = word;
      updatedWord.definition = definition;
      updatedWord.context = context;
      updatedWord.synonyms = synonyms;
      await updatedWord.save();
      res.status(200).json(updatedWord);
    }
  } catch (err) {
    errorHandler(err, res, 500);
  }
};
