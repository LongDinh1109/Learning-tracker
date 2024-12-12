import express from 'express';
import { getDateChecker, updateDateChecker } from '../controllers/dateCheckerController';
const router = express.Router();

router.get('/', getDateChecker as express.RequestHandler);

router.post('/', updateDateChecker as express.RequestHandler);

export default router;