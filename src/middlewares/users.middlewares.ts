import { Request, Response, NextFunction } from "express";
import { checkSchema } from "express-validator";

export const loginValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  next();
};

export const registerValidator = checkSchema({
  name: {
    notEmpty: true,
    isString: true,
    isLength: {
      options: {
        min: 1,
        max: 255,
      },
    },
    trim: true,
  },
  email: {
    notEmpty: true,
    isEmail: true,
    normalizeEmail: true,
    trim: true,
  },
  password: {
    notEmpty: true,
    isString: true,
    isLength: {
      options: {
        min: 6,
        max: 50,
      },
    },
    isStrongPassword: {
      options: {
        minLength: 6,
        minSymbols: 1,
        minNumbers: 1,
        minUppercase: 1,
        minLowercase: 1,
      },
    },
  },
  password_confirm: {
    notEmpty: true,
    isString: true,
    isLength: {
      options: {
        min: 6,
        max: 50,
      },
    },
    isStrongPassword: {
      options: {
        minLength: 6,
        minSymbols: 1,
        minNumbers: 1,
        minUppercase: 1,
        minLowercase: 1,
      },
    },
  },
  date_of_birth: {
    isISO8601: {
      options: {
        strict: true,
        strictSeparator: true,
      },
    },
  },
});
