import { DefaultError } from '../../../@shared/error/default.error';

export class RecordNotFound extends DefaultError {
  constructor(message: string) {
    super({ message, statusCode: 404 });
    this.name = RecordNotFound.name;
    Object.setPrototypeOf(this, RecordNotFound.prototype);
  }
}
