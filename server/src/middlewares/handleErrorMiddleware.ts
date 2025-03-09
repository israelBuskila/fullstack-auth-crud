import { Response, Request, NextFunction } from 'express';

export const handleError = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return
  }

  console.error(error); 

  if (error.message.includes("Some data is invalid")) {
    res.status(400).json({
      message: 'Some data is invalid. Please check your input and try again.',
    });
  }

  if (error.code === 'SQLITE_CONSTRAINT') {
    res.status(409).json({
      message: 'Conflict: Please make sure the data you are submitting is unique.',
    });
  }

  if (error.code === 'ECONNREFUSED') {
    res.status(503).json({
      message: 'Service unavailable. Please try again later.',
    });
  }

  return res.status(500).json({
    message: 'Something went wrong on our side. Please try again later.',
  });
};
