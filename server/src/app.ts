import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import { protect } from './middleware/authMiddleware';
import wordRouter from './routes/wordRoutes';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);

app.use('/api/users',protect, userRoutes);

app.use('/api/words',protect, wordRouter);

connectDB();

export default app;
