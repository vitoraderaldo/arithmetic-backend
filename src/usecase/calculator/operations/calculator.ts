import { InvalidArgument } from '../../../domain/calculator/error/invalid-argument';
import { CalculatorInterface } from '../strategy/calculator.interface';

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
      throw new InvalidArgument('Can not divide by zero');
    }
    return a / b;
  }

  public squareRoot(a: number): number {
    if (a < 0) {
      throw new InvalidArgument(
        'Can not calculate square root of negative numbers',
      );
    }
    return Math.sqrt(a);
  }

  public exponentiation(num1: number, num2: number): number {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      throw new InvalidArgument('Invalid arguments for exponentiation operation');
    }
    return Math.pow(num1, num2);
  }

  public modulus(num1: number, num2: number): number {
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
      throw new InvalidArgument('Invalid arguments for modulus operation');
    }
    if (num2 === 0) {
      throw new InvalidArgument('Division by zero is not allowed for modulus operation');
    }
    return num1 % num2;
  }
}
