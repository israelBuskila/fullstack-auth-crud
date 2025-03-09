import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/authUtils';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt || req.header('Authorization')?.split(' ')[1];

  if (!token) {
    res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }

  next();
};
