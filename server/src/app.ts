import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

connectDB();

export default app;
