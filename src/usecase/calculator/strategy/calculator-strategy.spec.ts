import { createMock } from "@golevelup/ts-jest";
import { AdditionCalculator } from "../operations/addition-calculator";
import { CalculatorStrategy } from "./calculator-strategy";
import { OperationType } from "../../../domain/calculator/operation.types";

describe('Calculator Strategy', () => {

  let calculatorStrategy: CalculatorStrategy;
  let additionCalculator: AdditionCalculator;
  
  beforeEach(() => {
    additionCalculator = createMock<AdditionCalculator>();
    calculatorStrategy = new CalculatorStrategy(additionCalculator);
  })

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  it('must be defined', () => {
    expect(calculatorStrategy).toBeDefined();
  })

  it('must calculate an addition operation', () => {
    const numbers = [1, 2]
    const result = 3

    jest
      .spyOn(additionCalculator, 'calculate')
      .mockReturnValueOnce(result)

    const response = calculatorStrategy.calculate(OperationType.ADDITION, ...numbers);
    expect(response).toEqual(result);
  })

})
