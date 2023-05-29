import { UnknownOperation } from '../../../domain/calculator/error/operation-not-found';
import { OperationType } from '../../../domain/calculator/operation.types';
import { RandomStringService } from '../operations/random-string.service';
import { CalculatorInterface } from './calculator.interface';

export class CalculatorStrategy {
  constructor(
    private readonly calculator: CalculatorInterface,
    private readonly randomStringService: RandomStringService,
  ) {}

  public calculate(operation: OperationType, ...input: any[]) {
    switch (operation) {
      case OperationType.ADDITION:
        return this.calculator.addition(input[0], input[1]);
      case OperationType.SUBTRACTION:
        return this.calculator.subtraction(input[0], input[1]);
      case OperationType.MULTIPLICATION:
        return this.calculator.multiplication(input[0], input[1]);
      case OperationType.DIVISION:
        return this.calculator.division(input[0], input[1]);
      case OperationType.SQUARE_ROOT:
        return this.calculator.squareRoot(input[0]);
      case OperationType.RANDOM_STRING:
        return this.randomStringService.randomString();
      default:
        throw new UnknownOperation(`Operation ${operation} not implemented`);
    }
  }
}
