import { HTTP_STATUS } from "~/constants/httpStatus";
import { USERS_MESSAGES } from "~/constants/messages";

// Record<string, string> is a type of object with string key and string value, for example: {[key: string]: string}
type ErrorType = Record<
  string,
  {
    msg: string;
    location: string;
    path: string;
    value: any;
    [key: string]: any;
  }
>;

export class ErrorWithStatus {
  message: string;
  status: number;
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message;
    this.status = status;
  }
}

// This EntityError class is used for validation error.
export class EntityError extends ErrorWithStatus {
  errors: ErrorType;
  constructor({
    message = USERS_MESSAGES.VALIDATION_ERROR,
    errors,
  }: {
    message?: string;
    errors: ErrorType;
  }) {
    super({
      message,
      status: HTTP_STATUS.UNPROCESSABLE_ENTITY,
    });
    this.errors = errors;
  }
}
