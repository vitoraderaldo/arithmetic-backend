import { ValidatorInterface } from '../../../@shared/validator/validator.interface';
import { Operation } from '../entity/operation';
import { OperationClassTransformValidator } from './operation-class-transform.validator';

export class OperationValidatorFactory {
  static create(): ValidatorInterface<Operation> {
    return new OperationClassTransformValidator();
  }
}
