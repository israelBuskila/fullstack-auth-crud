import { Request, Response, NextFunction } from 'express';

type RouterFn<T = unknown> = (req: Request, res: Response, next: NextFunction) => Promise<T>;

//add try catch for controllers
export const handleAsyncErrors = <T = unknown>(fn: RouterFn<T>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
