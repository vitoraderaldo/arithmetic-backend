import { DefaultError } from '../../../@shared/error/default.error';

export class UserNotFound extends DefaultError {
  constructor() {
    super({ message: 'User not found', statusCode: 404 });
    this.name = UserNotFound.name;
    Object.setPrototypeOf(this, UserNotFound.prototype);
  }
}
