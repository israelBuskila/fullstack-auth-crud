import { Response, Request, NextFunction } from "express";

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);

  // Prevents "Cannot set headers after they are sent" error
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
}
