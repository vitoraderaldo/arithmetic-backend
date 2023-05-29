import { DefaultError } from '../../../@shared/error/default.error';

export class InvalidArgument extends DefaultError {
  constructor(message: string) {
    super({ message, statusCode: 400 });
    this.name = InvalidArgument.name;
    Object.setPrototypeOf(this, InvalidArgument.prototype);
  }
}
