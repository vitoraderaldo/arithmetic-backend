import { Entity } from '../../../@shared/entity/entity.abstract';
import { InvalidDataError } from '../../../@shared/error/invalid-data.error';
import { OperationType } from '../operation.types';
import { OperationValidatorFactory } from '../validator/operation-validator.factory';

export class Operation extends Entity {
  constructor(
    private id: number,
    private type: OperationType,
    private name: string,
    private cost: number,
    private inputsRequired: number,
  ) {
    super();
    const isValid = OperationValidatorFactory.create().isValid(this);
    if (!isValid) {
      throw new InvalidDataError(this.notification.messages('operation'));
    }
  }

  getId(): number {
    return this.id;
  }

  getType(): OperationType {
    return this.type;
  }

  getCost(): number {
    return this.cost;
  }

  getName(): string {
    return this.name;
  }

  getInputsRequired(): number {
    return this.inputsRequired;
  }
}
