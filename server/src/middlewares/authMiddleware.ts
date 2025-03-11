import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/authUtils';

interface AuthenticatedRequest extends Request {
  user?: { id: string; email: string };
}

export const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt_token;

  if (!token) {
    res.status(403).send();
    return
  }

  try {
    const decoded = verifyToken(token);

    if (!decoded) {
      res.status(401).send();
      return
    }

    req.user = decoded as { id: string; email: string };

    next();
  } catch (err) {
    res.status(401).send();
  }
};
