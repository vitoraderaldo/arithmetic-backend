import { InvalidArgument } from '../../../domain/calculator/error/invalid-argument';
import { CalculatorInterface } from '../strategy/calculator.interface'

export class Calculator implements CalculatorInterface {

  public addition(a: number, b: number): number {
    return a + b;
  }

  public subtraction(a: number, b: number): number {
    return a - b;
  }

  public multiplication(a: number, b: number): number {
    return a * b;
  }

  public division(a: number, b: number): number {
    if (b == 0) {
      throw new InvalidArgument('Can not divide by zero')
    }
    return a / b;
  }

  public squareRoot(a: number): number {
    if ( a < 0 ) {
      throw new InvalidArgument('Can not calculate square root of negative numbers')
    }
    return Math.sqrt(a);
  }

  public randomString(): string {
    return 'oi';
  }

}
