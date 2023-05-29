import { DefaultError } from '../../../@shared/error/default.error';

export class InvalidCredentials extends DefaultError {
  constructor(message: string) {
    super({ message, statusCode: 400 });
    this.name = InvalidCredentials.name;
    Object.setPrototypeOf(this, InvalidCredentials.prototype);
  }
}
