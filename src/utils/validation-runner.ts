import { Request, Response, NextFunction } from "express";
import {
  validationResult,
  ContextRunner,
  ValidationChain,
} from "express-validator";
import { RunnableValidationChains } from "express-validator/src/middlewares/schema";

// Sequential processing, stops running validations chain if the previous one fails.
export const validate = (
  validation: RunnableValidationChains<ValidationChain>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    await validation.run(req);
    const errors = validationResult(req);

    // If there are no errors, continue to the next middleware
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.mapped() });
  };
};