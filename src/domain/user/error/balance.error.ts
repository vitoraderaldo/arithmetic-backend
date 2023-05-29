import { DefaultError } from '../../../@shared/error/default.error';

export class BalanceError extends DefaultError {
  constructor(message: string) {
    super({ message, statusCode: 400 });
    this.name = BalanceError.name;
    Object.setPrototypeOf(this, BalanceError.prototype);
  }
}
