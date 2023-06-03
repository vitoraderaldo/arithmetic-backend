import { ValidatorInterface } from '../../../@shared/validator/validator.interface';
import { Record } from '../entity/record';
import { RecordClassTransformValidator } from './record-class-transform.validator';

export class RecordValidatorFactory {
  static create(): ValidatorInterface<Record> {
    return new RecordClassTransformValidator();
  }
}
