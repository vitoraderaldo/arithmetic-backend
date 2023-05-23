import { createMock } from "@golevelup/ts-jest";
import { CalculateUseCase } from "./calculate.usecase";
import { CalculatorStrategy } from "./strategy/calculator-strategy";
import { CalculateInputDto } from "./dto/calculate.dto";
import { OperationType } from "../../domain/calculator/operation.types";

describe('Calculate Use Case', () => {

  let calculateUseCase: CalculateUseCase;
  let calculatorStrategy: CalculatorStrategy;
  
  beforeEach(() => {
    calculatorStrategy = createMock<CalculatorStrategy>();
    calculateUseCase = new CalculateUseCase(calculatorStrategy);
  })

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  it('must be defined', () => {
    expect(calculateUseCase).toBeDefined();
  })

  it('must calculate the operation', () => {
    const input: CalculateInputDto = {
      operation: OperationType.ADDITION,
      arguments: [1, 2]
    }
    const result = 3

    jest
      .spyOn(calculatorStrategy, 'calculate')
      .mockReturnValueOnce(result);

    const output = calculateUseCase.execute(input);
    expect(output).toEqual({ result });
  })

})
