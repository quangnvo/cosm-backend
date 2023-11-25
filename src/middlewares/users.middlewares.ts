import { Request, Response, NextFunction } from "express";
import { checkSchema } from "express-validator";
import { ErrorWithStatus } from "~/models/Errors";
import usersService from "~/services/users.services";
import { validate } from "~/utils/validation-runner";

// ----- Login validator -----
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

// ----- Register validator -----
export const registerValidator = validate(
  checkSchema({
    // Name
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

    // Email
    email: {
      notEmpty: true,
      isEmail: true,
      normalizeEmail: true,
      trim: true,
      custom: {
        options: async (value) => {
          const isExistEmail = await usersService.checkEmailExists(value);
          if (isExistEmail) {
            throw new ErrorWithStatus({
              message: "Email already exists",
              status: 400,
            });
          }
          return true;
        },
      },
    },

    // Password
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
      errorMessage:
        "Password must be at least 6 characters long and contain at least one symbol, one number, one uppercase and one lowercase character",
    },

    // Password confirm
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
      errorMessage:
        "Password must be at least 6 characters long and contain at least one symbol, one number, one uppercase and one lowercase character",
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error("Password confirmation does not match password");
          }
          return true;
        },
      },
    },

    // Date of birth
    date_of_birth: {
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true,
        },
      },
    },
  })
);
