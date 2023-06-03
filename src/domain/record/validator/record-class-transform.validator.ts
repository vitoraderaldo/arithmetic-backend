import {
  IsDate,
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  validateSync,
} from 'class-validator';
import { ValidatorInterface } from '../../../@shared/validator/validator.interface';
import { Record } from '../entity/record';

class RecordValidation {
  @IsUUID()
  id: string;

  @IsPositive({ message: 'OperationId must be greater than 0' })
  operationId: number;

  @IsPositive({ message: 'UserId must be greater than 0' })
  userId: number;

  @IsNumber()
  @IsPositive({ message: 'Amount must be greater than 0' })
  amount: number;

  @IsNumber()
  userBalance: number;

  @IsString({ message: 'Operation response must be a string' })
  operationResponse: string;

  @IsDate()
  createdAt: Date;
}

export class RecordClassTransformValidator
  implements ValidatorInterface<Record>
{
  isValid(entity: Record): boolean {
    const recordValidation = new RecordValidation();
    recordValidation.id = entity.getId();
    recordValidation.operationId = entity.getOperationId();
    recordValidation.userId = entity.getUserId();
    recordValidation.amount = entity.getAmount();
    recordValidation.userBalance = entity.getUserBalance();
    recordValidation.operationResponse = entity.getOperationResponse();
    recordValidation.createdAt = entity.getCreatedAt();

    const errors = validateSync(recordValidation);
    const hasErrors = errors.length > 0;
    if (hasErrors) {
      errors.forEach((error) => {
        const constraints = error.constraints;
        if (constraints) {
          Object.values(constraints).forEach((message) => {
            entity.notification.addError({ message, context: 'record' });
          });
        }
      });
    }
    return !hasErrors;
  }
}
