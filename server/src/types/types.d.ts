import { Request } from 'express';
import 'express-session';
import { Document } from 'mongoose';

declare module 'express-session' {
  interface SessionData {
    userId: string;
    isLoggedIn: boolean;
  }
}

export interface IBaseSchema extends Document {
  _id: Types.ObjectId;
}

export interface RequestWithUser extends Request {
  user?: string;
}