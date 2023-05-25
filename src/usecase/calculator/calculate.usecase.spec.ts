import { createMock } from "@golevelup/ts-jest";
import { CalculateUseCase } from "./calculate.usecase";
import { CalculatorStrategy } from "./strategy/calculator-strategy";
import { CalculateInputDto } from "./dto/calculate.dto";
import { OperationType } from "../../domain/calculator/operation.types";
import { UserRepositoryInterface } from "../../domain/user/repository/user-repository.interface";
import { OperationRepositoryInterface } from "../../domain/calculator/repository/operation-repository.interface";
import { User } from "../../domain/user/entity/user";
import { Operation } from "../../domain/calculator/entity/operation";
import { RecordRepositoryInterface } from "../../domain/record/repository/record-repository.interface";

describe('Calculate Use Case', () => {

  let calculateUseCase: CalculateUseCase;
  let calculatorStrategy: CalculatorStrategy;
  let userRepository: UserRepositoryInterface
  let operationRepository: OperationRepositoryInterface;
  let recordRepository: RecordRepositoryInterface;
  
  beforeEach(() => {
    calculatorStrategy = createMock<CalculatorStrategy>();
    userRepository = createMock<UserRepositoryInterface>();
    operationRepository = createMock<OperationRepositoryInterface>();
    recordRepository = createMock<RecordRepositoryInterface>();
    calculateUseCase = new CalculateUseCase(calculatorStrategy, userRepository, operationRepository, recordRepository);
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
    const operation = new Operation(1, OperationType.ADDITION, 'Addition', 10, 2)

    jest
      .spyOn(userRepository, 'findByIdentityProviderId')
      .mockResolvedValueOnce(user);

    jest
      .spyOn(operationRepository, 'findByType')
      .mockResolvedValueOnce(operation);

    const updateBalanceSpy = jest.spyOn(userRepository, 'updateBalance');
    const createRecordSpy = jest.spyOn(recordRepository, 'create');

    jest
      .spyOn(calculatorStrategy, 'calculate')
      .mockReturnValueOnce(result);

    const output = await calculateUseCase.execute(input);
    expect(output).toEqual({ result, finalBalance: 90 });
    expect(user.getCurrentBalance()).toEqual(90);
    expect(updateBalanceSpy).toHaveBeenCalledWith(user);
    expect(createRecordSpy).toHaveBeenCalled()
  })

  it('must not calculate the operation when the user balance is not enough', async () => {
    const input: CalculateInputDto = {
      identityProviderId: '123',
      operationType: OperationType.ADDITION,
      arguments: [1, 2]
    }
    const user = new User(1, 'email@email.com', 1, 5)
    const operation = new Operation(1, OperationType.ADDITION, 'Addition', 5.1, 2)

    jest
      .spyOn(userRepository, 'findByIdentityProviderId')
      .mockResolvedValueOnce(user);

    jest
      .spyOn(operationRepository, 'findByType')
      .mockResolvedValueOnce(operation);

    const updateBalanceSpy = jest.spyOn(userRepository, 'updateBalance');
    const createRecordSpy = jest.spyOn(recordRepository, 'create');

    const output = calculateUseCase.execute(input);
    await expect(output).rejects.toThrowError('User balance is not enough');
    expect(user.getCurrentBalance()).toEqual(5);
    expect(updateBalanceSpy).not.toHaveBeenCalled();
    expect(createRecordSpy).not.toHaveBeenCalled();
  })

})
