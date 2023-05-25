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
    return a / b;
  }

  public squareRoot(a: number): number {
    return Math.sqrt(a);
  }

  public randomString(): string {
    return 'oi';
  }

}
