import { OperationType } from "../../../domain/calculator/operation.types";
import { AdditionCalculator } from "../operations/addition-calculator";

export class CalculatorStrategy {

  constructor(
    private readonly additionCalculator: AdditionCalculator,
  ) {}
  
  public calculate(operation: OperationType, ...input: any[]) {
    if (operation === OperationType.ADDITION) {
      const result = this.additionCalculator.calculate(input[0], input[1])
      return result
    }
  }

}
