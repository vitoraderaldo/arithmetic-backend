import {
  IsEmail,
  IsInt,
  IsNumber,
  IsPositive,
  validateSync,
} from 'class-validator';
import { ValidatorInterface } from '../../../@shared/validator/validator.interface';
import { User } from '../entity/user';

class UserValidation {
  @IsPositive()
  @IsInt()
  id: number;

  @IsEmail()
  email: string;

  @IsPositive()
  @IsInt()
  statusId: number;

  @IsNumber()
  currentBalance: number;
}

export class UserClassTransformValidator implements ValidatorInterface<User> {
  isValid(entity: User): boolean {
    const userValidation = new UserValidation();
    userValidation.id = entity.getId();
    userValidation.email = entity.getEmail();
    userValidation.statusId = entity.getStatusId();
    userValidation.currentBalance = entity.getCurrentBalance();

    const errors = validateSync(userValidation);
    const hasErrors = errors.length > 0;
    if (hasErrors) {
      errors.forEach((error) => {
        const constraints = error.constraints;
        if (constraints) {
          Object.values(constraints).forEach((message) => {
            entity.notification.addError({ message, context: 'user' });
          });
        }
      });
    }
    return !hasErrors;
  }
}
