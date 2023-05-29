import { DefaultError } from '../../../@shared/error/default.error';

export class UnknownOperation extends DefaultError {
  constructor(message: string) {
    super({ message, statusCode: 404 });
    this.name = UnknownOperation.name;
    Object.setPrototypeOf(this, UnknownOperation.prototype);
  }
}
