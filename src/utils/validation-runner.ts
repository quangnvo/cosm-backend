import { Request, Response, NextFunction } from "express";
import {
  validationResult,
  ContextRunner,
  ValidationChain,
} from "express-validator";
import { RunnableValidationChains } from "express-validator/src/middlewares/schema";
import { ErrorWithStatus } from "~/models/Errors";
import { HTTP_STATUS } from "~/constants/httpStatus";

// Sequential processing, stops running validations chain if the previous one fails.
export const validate = (
  validation: RunnableValidationChains<ValidationChain>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req);
    const errors = validationResult(req);
    const errrosObject = errors.mapped();

    for (const key in errrosObject) {
      const { msg } = errrosObject[key];
      if (
        msg instanceof ErrorWithStatus &&
        msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY
      ) {
        return next(msg);
      }
    }

    if (errors.isEmpty()) {
      return next();
    }

    // In this case, no return error here, because we want to return all errors at once. So we will handle it in the index.js.
    res.status(422).json({ errors: errrosObject });
  };
};
