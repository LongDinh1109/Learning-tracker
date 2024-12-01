import express, { Request, Response } from 'express';
import Word from '../models/Word';
import { errorHandler } from '../utils/errorHandler';

const router = express.Router();
// Get all words from the database
router.get('/', async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (err) {
    errorHandler(err, res, 500);
  }
});

router.post('/', async (req, res) => {
  try {
    const { word, definition, context, synonyms } = req.body;
    const newWord = new Word({ word, definition, context, synonyms });
    await newWord.save();
    res.status(201).json(newWord);
  } catch (err) {
    errorHandler(err, res, 400);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const wordId = req.params.id;
    const deletedWord = await Word.findById(wordId);
    if (!deletedWord) {
      console.log(deletedWord);
      res.status(404).json({ message: 'Word not found' });
    }
    await Word.findByIdAndDelete(wordId);
    res.status(200).json({ message: 'Word deleted successfully' });
  } catch (err) {
    console.log(err);
    errorHandler(err, res, 500);
  }
});

router.post('/:id', async (req: Request, res: Response) => {
  const wordId = req.params.id;
  const { word, definition, context, synonyms } = req.body;
  try {
    const updatedWord = await Word.findById(wordId);
    if(!updatedWord) {
      res.status(404).json({ message: 'Word not found' });
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
});

export default router;
