export class ValidationError extends Error {
  httpCode = 400;

  constructor(message: any) {
    super(message);
  }
}
