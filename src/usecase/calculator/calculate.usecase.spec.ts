import { createMock } from "@golevelup/ts-jest";
import { CalculateUseCase } from "./calculate.usecase";
import { CalculatorStrategy } from "./strategy/calculator-strategy";
import { CalculateInputDto } from "./dto/calculate.dto";
import { OperationType } from "../../domain/calculator/operation.types";
import { UserRepositoryInterface } from "../../domain/user/repository/user-repository.interface";

describe('Calculate Use Case', () => {

  let calculateUseCase: CalculateUseCase;
  let calculatorStrategy: CalculatorStrategy;
  let userRepositoryInterface: UserRepositoryInterface
  
  beforeEach(() => {
    calculatorStrategy = createMock<CalculatorStrategy>();
    userRepositoryInterface = createMock<UserRepositoryInterface>();
    calculateUseCase = new CalculateUseCase(calculatorStrategy, userRepositoryInterface);
  })

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  })

  it('must be defined', () => {
    expect(calculateUseCase).toBeDefined();
  })

  it('must calculate the operation', async () => {
    const input: CalculateInputDto = {
      identityProviderId: '123',
      operation: OperationType.ADDITION,
      arguments: [1, 2]
    }
    const result = 3

    jest
      .spyOn(calculatorStrategy, 'calculate')
      .mockReturnValueOnce(result);

    const output = await calculateUseCase.execute(input);
    expect(output).toEqual({ result });
  })

})
