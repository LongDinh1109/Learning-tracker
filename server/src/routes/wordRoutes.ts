import express from 'express';
import Word from '../models/Word';

const router = express.Router();
router.get('/', async (req, res) => {
  try {
    const words = await Word.find();
    res.json(words);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
});
