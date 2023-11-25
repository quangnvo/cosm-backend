import { HTTP_STATUS } from "~/constants/httpStatus";
import { NextFunction, Request, Response } from "express";
import { omit } from "lodash";

export const defaultErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Default is 500 Internal Server Error
  // User omit to remove "status" from err object, because it already has "status" property.
  res
    .status(err.status || HTTP_STATUS.INTERNAL_SERVER)
    .json(omit(err, ["status"]));
};
