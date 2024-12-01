import express from 'express';
import { registerUser, authUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser as express.RequestHandler);
router.post('/login', authUser as express.RequestHandler);

export default router;
