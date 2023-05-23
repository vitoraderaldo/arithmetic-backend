import { CalculatorInterface } from '../strategy/calculator.interface'

export class AdditionCalculator implements CalculatorInterface<number> {

  public calculate(a: number, b: number): number {
    return a + b;
  }

}
