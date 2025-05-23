export interface CalculatorInterface {
  addition(a: number, b: number): number;
  subtraction(a: number, b: number): number;
  multiplication(a: number, b: number): number;
  division(a: number, b: number): number;
  squareRoot(a: number): number;
  exponentiation(num1: number, num2: number): number;
  modulus(num1: number, num2: number): number;
}
