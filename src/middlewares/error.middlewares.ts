import { HTTP_STATUS } from "~/constants/httpStatus";
import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";
import { ErrorWithStatus } from "~/models/Errors";

export const defaultErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorWithStatus) {
    return res.status(err.status).json(omit(err, ["status"]));
  }

  Object.getOwnPropertyNames(err).forEach((key) => {
    Object.defineProperty(err, key, { enumerable: true });
  });

  // Default is 500 Internal Server Error
  // Use omit to remove "status" from err object, because it already has "status" property.
  res.status(err.status || HTTP_STATUS.INTERNAL_SERVER).json({
    message: err.message,
    errorInfo: omit(err, ["stack"]),
  });
};
