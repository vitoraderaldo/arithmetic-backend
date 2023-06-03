import { ValidatorInterface } from '../../../@shared/validator/validator.interface';
import { User } from '../entity/user';
import { UserClassTransformValidator } from './user-class-transform.validator';

export class UserValidatorFactory {
  static create(): ValidatorInterface<User> {
    return new UserClassTransformValidator();
  }
}
