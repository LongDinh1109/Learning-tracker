import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RequestWithUser } from '../types/types';

interface DecodedToken {
  id: string;
}

const protect = (req: RequestWithUser, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token from "Bearer <token>"

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken;
      req.user = decoded.id; // Attach user ID to the request object

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export { protect };