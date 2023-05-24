import { createMock } from "@golevelup/ts-jest";
import { CalculateUseCase } from "./calculate.usecase";
import { CalculatorStrategy } from "./strategy/calculator-strategy";
import { CalculateInputDto } from "./dto/calculate.dto";
import { OperationType } from "../../domain/calculator/operation.types";
import { UserRepositoryInterface } from "../../domain/user/repository/user-repository.interface";
import { OperationRepositoryInterface } from "../../domain/calculator/repository/operation-repository.interface";
import { User } from "../../domain/user/entity/user";
import { Operation } from "../../domain/calculator/entity/operation";

describe('Calculate Use Case', () => {

  let calculateUseCase: CalculateUseCase;
  let calculatorStrategy: CalculatorStrategy;
  let userRepositoryInterface: UserRepositoryInterface
  let operationRepositoryInterface: OperationRepositoryInterface;
  
  beforeEach(() => {
    calculatorStrategy = createMock<CalculatorStrategy>();
    userRepositoryInterface = createMock<UserRepositoryInterface>();
    operationRepositoryInterface = createMock<OperationRepositoryInterface>();
    calculateUseCase = new CalculateUseCase(calculatorStrategy, userRepositoryInterface, operationRepositoryInterface);
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
      operationType: OperationType.ADDITION,
      arguments: [1, 2]
    }
    const result = 3

    const user = new User(1, 'email@email.com', 1, 100)
    const operation = new Operation(1, OperationType.ADDITION, 10)

    jest
      .spyOn(userRepositoryInterface, 'findByIdentityProviderId')
      .mockResolvedValueOnce(user);

    jest
      .spyOn(operationRepositoryInterface, 'findByType')
      .mockResolvedValueOnce(operation);

    const updateBalanceSpy = jest.spyOn(userRepositoryInterface, 'updateBalance');

    jest
      .spyOn(calculatorStrategy, 'calculate')
      .mockReturnValueOnce(result);

    const output = await calculateUseCase.execute(input);
    expect(output).toEqual({ result });
    expect(user.getCurrentBalance()).toEqual(90);
    expect(updateBalanceSpy).toHaveBeenCalledWith(user);
  })

  it('must not calculate the operation when the user balance is not enough', async () => {
    const input: CalculateInputDto = {
      identityProviderId: '123',
      operationType: OperationType.ADDITION,
      arguments: [1, 2]
    }
    const user = new User(1, 'email@email.com', 1, 5)
    const operation = new Operation(1, OperationType.ADDITION, 5.1)

    jest
      .spyOn(userRepositoryInterface, 'findByIdentityProviderId')
      .mockResolvedValueOnce(user);

    jest
      .spyOn(operationRepositoryInterface, 'findByType')
      .mockResolvedValueOnce(operation);

    const updateBalanceSpy = jest.spyOn(userRepositoryInterface, 'updateBalance');

    const output = calculateUseCase.execute(input);
    await expect(output).rejects.toThrowError('User balance is not enough');
    expect(user.getCurrentBalance()).toEqual(5);
    expect(updateBalanceSpy).not.toHaveBeenCalled();
  })

})
