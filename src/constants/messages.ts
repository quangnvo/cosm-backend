export const USERS_MESSAGES = {
  VALIDATION_ERROR: "Validation error",

  // Name
  NAME_IS_REQUIRED: "Name is required",
  NAME_MUST_BE_STRING: "Name must be string",
  NAME_LENGTH_MUST_BE_BETWEEN_1_AND_255:
    "Name length must be between 1 and 255",

  // Email
  EMAIL_ALREADY_EXISTS: "Email already exists",
  EMAIL_IS_REQUIRED: "Email is required",
  EMAIL_IS_INVALID: "Email is invalid",
  EMAIL_OR_PASSWORD_IS_INCORRECT: "Email or password is incorrect",

  // Password
  PASSWORD_IS_REQUIRED: "Password is required",
  PASSWORD_MUST_BE_STRING: "Password must be string",
  PASSWORD_LENGTH_MUST_BE_BETWEEN_6_AND_50:
    "Password length must be between 6 and 50",
  PASSWORD_MUST_BE_STRONG:
    "Password must be at least 6 characters long and contain at least one symbol, one number, one uppercase and one lowercase character",

  // Password confirm
  PASSWORD_CONFIRM_IS_REQUIRED: "Confirm password is required",
  PASSWORD_CONFIRM_MUST_BE_STRING: "Confirm password must be string",
  PASSWORD_CONFIRM_LENGTH_MUST_BE_BETWEEN_6_AND_50:
    "Confirm password length must be between 6 and 50",
  PASSWORD_CONFIRM_MUST_BE_STRONG:
    "Confirm password must be at least 6 characters long and contain at least one symbol, one number, one uppercase and one lowercase character",
  PASSWORD_NOT_MATCH: "Password and confirm password do not match",

  // Date of birth
  DATE_OF_BIRTH_MUST_BE_ISO8601: "Date of birth must be ISO8601",

  // Login
  LOGIN_SUCCESS: "Login success",

  // Register
  REGISTER_SUCCESS: "Register success",

  // Access token
  ACCESS_TOKEN_IS_REQUIRED: "Access token is required",

  // Refresh token
  REFRESH_TOKEN_IS_REQUIRED: "Refresh token is required",
  REFRESH_TOKEN_MUST_BE_STRING: "Refresh token must be string",
  REFRESH_TOKEN_IS_INVALID: "Refresh token is invalid",
  REFRESH_TOKEN_IS_USED_OR_NOT_EXISTS: "Refresh token is used or not exists",
} as const;
