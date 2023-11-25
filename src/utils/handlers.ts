import { NextFunction, Request, Response } from "express";

export const wrapAsync =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
