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

  it('must return a random string', () => {
    const response = calculator.randomString();
    expect(response).toBeDefined();
    expect(response.length).toBeGreaterThan(1);
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
});
