import {
  IsEnum,
  IsNumber,
  IsPositive,
  IsString,
  Min,
  MinLength,
  validateSync,
} from 'class-validator';
import { ValidatorInterface } from '../../../@shared/validator/validator.interface';
import { Operation } from '../entity/operation';
import { OperationType } from '../operation.types';

class OperationValidation {
  @IsPositive()
  id: number;

  @IsEnum(OperationType)
  type: OperationType;

  @IsString()
  @MinLength(1)
  name: string;

  @IsPositive()
  cost: number;

  @IsNumber()
  @Min(0, {
    message: 'Operation inputs required must be greater than or equal to 0',
  })
  inputsRequired: number;
}

export class OperationClassTransformValidator
  implements ValidatorInterface<Operation>
{
  isValid(entity: Operation): boolean {
    const operationValidation = new OperationValidation();
    operationValidation.id = entity.getId();
    operationValidation.type = entity.getType();
    operationValidation.name = entity.getName();
    operationValidation.cost = entity.getCost();
    operationValidation.inputsRequired = entity.getInputsRequired();

    const errors = validateSync(operationValidation);
    const hasErrors = errors.length > 0;
    if (hasErrors) {
      errors.forEach((error) => {
        const constraints = error.constraints;
        if (constraints) {
          Object.values(constraints).forEach((message) => {
            entity.notification.addError({ message, context: 'operation' });
          });
        }
      });
    }
    return !hasErrors;
  }
}
