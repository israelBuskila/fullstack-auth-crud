import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/authUtils'; // Assuming this is your function to verify JWT

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt_token

  // If no token is found, deny access
  if (!token) {
     res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using your utility function
    const decoded = verifyToken(token);

    // If the token is invalid, return an error
    if (!decoded) {
       res.status(401).json({ message: 'Invalid or expired token.' });
    }

    // Attach the decoded user data to the request object for future use
    // req.user = decoded;

    // Call next to pass control to the next middleware or route handler
    next();
  } catch (err) {
    // Catch any errors thrown during verification (like expired tokens)
     res.status(401).json({ message: 'Invalid or expired token.' });
  }
};
