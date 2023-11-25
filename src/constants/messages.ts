export const USERS_MESSAGES = {
  VALIDATION_ERROR: "Validation error",

  NAME_IS_REQUIRED: "Name is required",
  NAME_MUST_BE_STRING: "Name must be string",
  NAME_LENGTH_MUST_BE_BETWEEN_1_AND_255:
    "Name length must be between 1 and 255",

  EMAIL_ALREADY_EXISTS: "Email already exists",
  EMAIL_IS_REQUIRED: "Email is required",
  EMAIl_IS_INVALID: "Email is invalid",

  PASSWORD_IS_REQUIRED: "Password is required",
  PASSWORD_MUST_BE_STRING: "Password must be string",
  PASSWORD_LENGTH_MUST_BE_BETWEEN_6_AND_50:
    "Password length must be between 6 and 50",
  PASSWORD_MUST_BE_STRONG:
    "Password must be at least 6 characters long and contain at least one symbol, one number, one uppercase and one lowercase character",

  PASSWORD_CONFIRM_IS_REQUIRED: "Confirm password is required",
  PASSWORD_CONFIRM_MUST_BE_STRING: "Confirm password must be string",
  PASSWORD_CONFIRM_LENGTH_MUST_BE_BETWEEN_6_AND_50:
    "Confirm password length must be between 6 and 50",
  PASSWORD_CONFIRM_MUST_BE_STRONG:
    "Confirm password must be at least 6 characters long and contain at least one symbol, one number, one uppercase and one lowercase character",
} as const;
