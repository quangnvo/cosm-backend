import { checkSchema } from "express-validator";
import usersService from "~/services/users.services";
import { validate } from "~/utils/validation-runner";
import { USERS_MESSAGES } from "~/constants/messages";
import databaseService from "~/services/database.services";

// ----- Login validator -----
export const loginValidator = validate(
  checkSchema({
    // Email
    email: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED,
      },
      isEmail: {
        errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID,
      },
      normalizeEmail: true,
      trim: true,
      custom: {
        options: async (value, { req }) => {
          // const isExistEmail = await usersService.checkEmailExists(value);
          const user = await databaseService.users.findOne({ email: value });
          if (user === null) {
            throw new Error(USERS_MESSAGES.USER_NOT_FOUND);
          }
          req.user = user;
          return true;
        },
      },
    },

    // Password
    password: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED,
      },
      isString: {
        errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRING,
      },
      isLength: {
        options: {
          min: 6,
          max: 50,
        },
        errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_BETWEEN_6_AND_50,
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minSymbols: 1,
          minNumbers: 1,
          minUppercase: 1,
          minLowercase: 1,
        },
        errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG,
      },
    },
  })
);

// ----- Register validator -----
export const registerValidator = validate(
  checkSchema({
    // Name
    name: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.NAME_IS_REQUIRED,
      },
      isString: {
        errorMessage: USERS_MESSAGES.NAME_MUST_BE_STRING,
      },
      isLength: {
        options: {
          min: 1,
          max: 255,
        },
        errorMessage: USERS_MESSAGES.NAME_LENGTH_MUST_BE_BETWEEN_1_AND_255,
      },
      trim: true,
    },

    // Email
    email: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.EMAIL_IS_REQUIRED,
      },
      isEmail: {
        errorMessage: USERS_MESSAGES.EMAIL_IS_INVALID,
      },
      normalizeEmail: true,
      trim: true,
      custom: {
        options: async (value) => {
          const isExistEmail = await usersService.checkEmailExists(value);
          if (isExistEmail) {
            throw new Error(USERS_MESSAGES.EMAIL_ALREADY_EXISTS);
          }
          return true;
        },
      },
    },

    // Password
    password: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.PASSWORD_IS_REQUIRED,
      },
      isString: {
        errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRING,
      },
      isLength: {
        options: {
          min: 6,
          max: 50,
        },
        errorMessage: USERS_MESSAGES.PASSWORD_LENGTH_MUST_BE_BETWEEN_6_AND_50,
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minSymbols: 1,
          minNumbers: 1,
          minUppercase: 1,
          minLowercase: 1,
        },
        errorMessage: USERS_MESSAGES.PASSWORD_MUST_BE_STRONG,
      },
    },

    // Password confirm
    password_confirm: {
      notEmpty: {
        errorMessage: USERS_MESSAGES.PASSWORD_CONFIRM_IS_REQUIRED,
      },
      isString: {
        errorMessage: USERS_MESSAGES.PASSWORD_CONFIRM_MUST_BE_STRING,
      },

      isLength: {
        options: {
          min: 6,
          max: 50,
        },
        errorMessage:
          USERS_MESSAGES.PASSWORD_CONFIRM_LENGTH_MUST_BE_BETWEEN_6_AND_50,
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minSymbols: 1,
          minNumbers: 1,
          minUppercase: 1,
          minLowercase: 1,
        },
        errorMessage: USERS_MESSAGES.PASSWORD_CONFIRM_MUST_BE_STRONG,
      },

      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error(USERS_MESSAGES.PASSWORD_NOT_MATCH);
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
        errorMessage: USERS_MESSAGES.DATE_OF_BIRTH_MUST_BE_ISO8601,
      },
    },
  })
);
