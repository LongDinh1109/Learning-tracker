import express, { RequestHandler } from 'express';

import {
  addNewWord,
  deleteWord,
  getAllWords,
  getWordsByUser,
  updateWord,
} from '../controllers/wordController';

const router = express.Router();
// Get all words from the database
router.get('/getAllWords', getAllWords);

router.get('/', getWordsByUser as RequestHandler);

router.post('/', addNewWord);

router.delete('/:id', deleteWord as RequestHandler);

router.post('/:id', updateWord as RequestHandler);

export default router;
