import { createMock } from "@golevelup/ts-jest";
import { CalculatorStrategy } from "./calculator-strategy";
import { OperationType } from "../../../domain/calculator/operation.types";
import { CalculatorInterface } from "./calculator.interface";
import { RandomStringService } from "../operations/random-string.service";
import { UnknownOperation } from "../../../domain/calculator/error/operation-not-found";

type Props = {
  operation: OperationType;
  input: any[];
  result: number;
  expectedFunction: 'addition' | 'subtraction' | 'multiplication' | 'division' | 'squareRoot' | 'randomString';
}

describe('Calculator Strategy', () => {

  let calculatorStrategy: CalculatorStrategy;
  let calculator: CalculatorInterface;
  let randomStringService: RandomStringService;
  
  beforeEach(() => {
    calculator = createMock<CalculatorInterface>();
    randomStringService = createMock<RandomStringService>();
    calculatorStrategy = new CalculatorStrategy(calculator, randomStringService);
  })

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  it('must be defined', () => {
    expect(calculatorStrategy).toBeDefined();
  })

  describe('Math operations', () => {
    it.each`
      operation                       | input     | result      | expectedFunction
      ${OperationType.ADDITION}       | ${[1, 2]} | ${3}        | ${'addition'}
      ${OperationType.SUBTRACTION}    | ${[1, 2]} | ${-1}       | ${'subtraction'}
      ${OperationType.MULTIPLICATION} | ${[1, 2]} | ${2}        | ${'multiplication'}
      ${OperationType.DIVISION}       | ${[1, 2]} | ${0.5}      | ${'division'}
      ${OperationType.SQUARE_ROOT}    | ${[1]}    | ${1}        | ${'squareRoot'}
    `('must calculate operations', ({operation, input, result, expectedFunction}: Props) => {

      jest
        .spyOn(calculator, expectedFunction)
        .mockReturnValueOnce(result)

      const response = calculatorStrategy.calculate(operation, ...input);
      expect(response).toEqual(result);
    })
  })

  describe('Random String', () => {
    it('must return a random string', async () => {
      const randomString = 'random-string';
      jest
        .spyOn(randomStringService, 'randomString')
        .mockResolvedValueOnce(randomString)

      const response = await calculatorStrategy.calculate(OperationType.RANDOM_STRING);
      expect(response).toEqual(randomString);
    })
  })

  describe('Unknown operation', () => {
    it('must throw an error', () => {
      const operation = 'unknown-operation' as OperationType;
      const calculate = () => calculatorStrategy.calculate(operation);
      expect(calculate).toThrowError(`Operation unknown-operation not implemented`);
      expect(calculate).toThrowError(UnknownOperation);
    })
  })

})
