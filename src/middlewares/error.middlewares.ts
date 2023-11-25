import { NextFunction, Request, Response } from "express";

export const defaultErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {};
