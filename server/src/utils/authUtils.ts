import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.JWT_SECRET || 'your-secret-key';

export const generateToken = (userId: string) => {
    const expiresIn = '1h';
  return jwt.sign({ userId }, secret, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    return null;
  }
};