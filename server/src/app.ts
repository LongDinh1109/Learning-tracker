import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import { protect } from './middleware/authMiddleware';
import wordRouter from './routes/wordRoutes';
import dateCheckerRoutes from './routes/dateCheckerRoute';
import cors from 'cors';
// import MongoStore from 'connect-mongo';
// import Session from 'express-session';
// import mongoose from 'mongoose';
import 'express-session';

declare module 'express-session' {
  interface SessionData {
    userId: string;
    isLoggedIn: boolean;
  }
}

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(cors());
// app.use(
//     Session({s
//         secret: process.env.JWT_SECRET || 'secret',
//         resave: false,
//         saveUninitialized: false,
//         store: MongoStore.create({
//             clientPromise: mongoose.connection.asPromise().then((conn)=> conn.getClient()),
//             dbName: 'learning-tracker',
//             collectionName: 'sessions',
//         }),
//         cookie: {
//             maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
//             secure: process.env.NODE_ENV === 'production',
//             httpOnly: true,
//         }
//     })
// )

app.use('/api/auth', authRoutes);

app.use('/api/users', protect, userRoutes);

app.use('/api/words', protect, wordRouter);

app.use('/api/date-checker', protect, dateCheckerRoutes);

export default app;
