import { Response } from 'express';
import DateChecker, { TimesOfCheck } from '../models/DateChecker';
import { RequestWithUser } from '../types/types';
import { errorHandler } from '../utils/errorHandler';
import Word from '../models/Word';

export const getDateChecker = async (req: RequestWithUser, res: Response) => {
  try {
    const userId = req.user;
    const dateChecker = await DateChecker.find({ userId });
    if (!dateChecker) {
      return res.status(404).json({ message: 'DateChecker not found' });
    }
    const getWordsToCheck = await Word.find();
    const wordsToCheck = dateChecker.map((date) => {
      const word = getWordsToCheck.find(
        (word) => word._id.toString() === date.wordId.toString(),
      );
      return {
        word: word,
        dateOfCheck: date.dateOfCheck,
      };
    });
    res.status(200).json(wordsToCheck);
  } catch (err) {
    console.log(err);

    errorHandler(err, res, 500);
  }
};

export const updateDateChecker = async (
  req: RequestWithUser,
  res: Response,
) => {
  try {
    const userId = req.user;
    const { wordId, times } = req.body;
    console.log(wordId, times);
    
    // Validate `timesOfCheck` against the allowed values
    if (!['first', 'third', 'seventh', 'fourteenth'].includes(times)) {
      return res.status(400).json({ message: 'Invalid timesOfCheck value' });
    }

    const dateChecker = await DateChecker.findOne({ userId, wordId });

    if (dateChecker) {
      // Cast `timesOfCheck` as `TimesOfCheck` after validation
      const key = times as TimesOfCheck;
      dateChecker.dateOfCheck[key].isChecked = true;
      
      await dateChecker.save();
      res.status(200).json({ message: 'DateChecker updated successfully' });
    } else {
      res.status(404).json({ message: 'DateChecker not found' });
    }
  } catch (err) {
    errorHandler(err, res, 500);
  }
};
