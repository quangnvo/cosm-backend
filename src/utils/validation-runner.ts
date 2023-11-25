import { Request, Response, NextFunction } from "express";
import {
  validationResult,
  ContextRunner,
  ValidationChain,
} from "express-validator";
import { RunnableValidationChains } from "express-validator/src/middlewares/schema";
import { EntityError, ErrorWithStatus } from "~/models/Errors";
import { HTTP_STATUS } from "~/constants/httpStatus";

// Sequential processing, stops running validations chain if the previous one fails.
export const validate = (
  validation: RunnableValidationChains<ValidationChain>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    const errrosObject = errors.mapped();
    const entityError = new EntityError({ errors: {} });

    // Check if there is any error with status code other than 422 (Unprocessable Entity). If there is, return it immediately.
    for (const key in errrosObject) {
      const { msg } = errrosObject[key];

      // Return the errors which are not from VALIDATION
      if (
        msg instanceof ErrorWithStatus &&
        msg.status !== HTTP_STATUS.UNPROCESSABLE_ENTITY
      ) {
        return next(msg);
      }

      entityError.errors[key] = errrosObject[key];
    }

    // In this case, no return error here, because we want to return all errors at once. So we will handle it in the index.js.
    next(entityError);
  };
};
