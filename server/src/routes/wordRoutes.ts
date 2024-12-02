import express, { RequestHandler } from 'express';

import {
  addNewWord,
  deleteWord,
  getAllWords,
  updateWord,
} from '../controllers/wordController';

const router = express.Router();
// Get all words from the database
router.get('/', getAllWords);

router.post('/', addNewWord);

router.delete('/:id', deleteWord as RequestHandler);

router.post('/:id', updateWord as RequestHandler);

export default router;
