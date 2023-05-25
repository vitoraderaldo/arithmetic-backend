import { createMock } from "@golevelup/ts-jest";
import { CalculatorStrategy } from "./calculator-strategy";
import { OperationType } from "../../../domain/calculator/operation.types";
import { CalculatorInterface } from "./calculator.interface";

type Props = {
  operation: OperationType;
  input: any[];
  result: number;
  expectedFunction: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'squareRoot' | 'randomString';
}

describe('Calculator Strategy', () => {

  let calculatorStrategy: CalculatorStrategy;
  let calculator: CalculatorInterface;
  
  beforeEach(() => {
    calculator = createMock<CalculatorInterface>();
    calculatorStrategy = new CalculatorStrategy(calculator);
  })

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  it('must be defined', () => {
    expect(calculatorStrategy).toBeDefined();
  })

  it.each`
    operation                       | input     | result      | expectedFunction
    ${OperationType.ADDITION}       | ${[1, 2]} | ${3}        | ${'addition'}
    ${OperationType.SUBTRACTION}    | ${[1, 2]} | ${-1}       | ${'subtraction'}
    ${OperationType.MULTIPLICATION} | ${[1, 2]} | ${2}        | ${'multiplication'}
    ${OperationType.DIVISION}       | ${[1, 2]} | ${0.5}      | ${'division'}
    ${OperationType.SQUARE_ROOT}    | ${[1]}    | ${1}        | ${'squareRoot'}
    ${OperationType.RANDOM_STRING}  | ${[]}     | ${'string'} | ${'randomString'}
  `('must calculate operations', ({operation, input, result, expectedFunction}: Props) => {

    jest
      .spyOn(calculator, expectedFunction)
      .mockReturnValueOnce(result)

    const response = calculatorStrategy.calculate(operation, ...input);
    expect(response).toEqual(result);
  })

})
