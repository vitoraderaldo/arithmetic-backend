import { DefaultError } from './default.error';

export class InvalidDataError extends DefaultError {
  constructor(message: string) {
    super({ message, statusCode: 400 });
    this.name = InvalidDataError.name;
    Object.setPrototypeOf(this, InvalidDataError.prototype);
  }
}
