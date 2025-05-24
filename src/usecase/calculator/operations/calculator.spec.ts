import { InvalidArgument } from '../../../domain/calculator/error/invalid-argument';
import { Calculator } from './calculator';

type Props = {
  a: number;
  b: number;
  result: number;
};

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('must be defined', () => {
    expect(calculator).toBeDefined();
  });

  it.each`
    a    | b    | result
    ${1} | ${2} | ${3}
    ${2} | ${3} | ${5}
    ${3} | ${0} | ${3}
  `('must perform addition operation', ({ a, b, result }: Props) => {
    const response = calculator.addition(a, b);
    expect(response).toEqual(result);
  });

  it.each`
    a    | b    | result
    ${1} | ${2} | ${-1}
    ${4} | ${4} | ${0}
    ${3} | ${0} | ${3}
  `('must perform subtraction operation', ({ a, b, result }: Props) => {
    const response = calculator.subtraction(a, b);
    expect(response).toEqual(result);
  });

  it.each`
    a    | b    | result
    ${1} | ${2} | ${2}
    ${4} | ${3} | ${12}
    ${3} | ${0} | ${0}
  `('must perform multiplication operation', ({ a, b, result }: Props) => {
    const response = calculator.multiplication(a, b);
    expect(response).toEqual(result);
  });

  it.each`
    a    | b    | result
    ${1} | ${2} | ${0.5}
    ${4} | ${2} | ${2}
    ${3} | ${1} | ${3}
  `('must perform division operation', ({ a, b, result }: Props) => {
    const response = calculator.division(a, b);
    expect(response).toEqual(result);
  });

  it.each`
    a     | result
    ${4}  | ${2}
    ${9}  | ${3}
    ${16} | ${4}
  `('must perform square root operation', ({ a, result }: Props) => {
    const response = calculator.squareRoot(a);
    expect(response).toEqual(result);
  });

  it('must throw error when square root of negative number', () => {
    const squareRoot = () => calculator.squareRoot(-1);
    expect(squareRoot).toThrowError(InvalidArgument);
    expect(squareRoot).toThrowError(
      'Can not calculate square root of negative numbers',
    );
  });

  it('must throw error when division by zero', () => {
    const division = () => calculator.division(1, 0);
    expect(division).toThrowError(InvalidArgument);
    expect(division).toThrowError('Can not divide by zero');
  });

  // Exponentiation tests
  it.each`
    a    | b    | result
    ${2} | ${3} | ${8}
    ${5} | ${0} | ${1}
    ${0} | ${5} | ${0}
    ${2} | ${-2} | ${0.25}
    ${4} | ${0.5} | ${2}
  `('must perform exponentiation operation', ({ a, b, result }: Props) => {
    const response = calculator.exponentiation(a, b);
    expect(response).toEqual(result);
  });

  it('must throw error when exponentiation with invalid arguments', () => {
    const exponentiation1 = () => calculator.exponentiation('a' as any, 2);
    expect(exponentiation1).toThrowError(InvalidArgument);
    expect(exponentiation1).toThrowError('Invalid arguments for exponentiation operation');

    const exponentiation2 = () => calculator.exponentiation(2, 'b' as any);
    expect(exponentiation2).toThrowError(InvalidArgument);
    expect(exponentiation2).toThrowError('Invalid arguments for exponentiation operation');
  });

  // Modulus tests
  it.each`
    a     | b     | result
    ${10} | ${3}  | ${1}
    ${10} | ${2}  | ${0}
    ${-10} | ${3} | ${-1}
    ${10} | ${-3} | ${1}
    ${0}  | ${5}  | ${0}
  `('must perform modulus operation', ({ a, b, result }: Props) => {
    const response = calculator.modulus(a, b);
    expect(response).toEqual(result);
  });

  it('must throw error when modulus by zero', () => {
    const modulus = () => calculator.modulus(10, 0);
    expect(modulus).toThrowError(InvalidArgument);
    expect(modulus).toThrowError('Division by zero is not allowed for modulus operation');
  });

  it('must throw error when modulus with invalid arguments', () => {
    const modulus1 = () => calculator.modulus('a' as any, 2);
    expect(modulus1).toThrowError(InvalidArgument);
    expect(modulus1).toThrowError('Invalid arguments for modulus operation');

    const modulus2 = () => calculator.modulus(2, 'b' as any);
    expect(modulus2).toThrowError(InvalidArgument);
    expect(modulus2).toThrowError('Invalid arguments for modulus operation');
  });
});
