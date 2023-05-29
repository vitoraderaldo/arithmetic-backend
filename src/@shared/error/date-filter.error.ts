import { DefaultError } from './default.error';

export class DateFilterError extends DefaultError {
  constructor(message: string) {
    super({ message, statusCode: 400 });
    this.name = DateFilterError.name;
    Object.setPrototypeOf(this, DateFilterError.prototype);
  }
}
