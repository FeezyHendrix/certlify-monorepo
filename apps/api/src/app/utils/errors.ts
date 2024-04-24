export class HttpException extends Error {
  public status: number;
  public message: string;
  public isOperational;

  constructor(status: number, message: string, isOperational = true, stack = '') {
    super(message);
    this.status = status;
    this.message = message;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
