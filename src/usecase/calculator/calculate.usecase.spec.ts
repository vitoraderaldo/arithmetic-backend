import { createMock } from '@golevelup/ts-jest';
import { CalculateUseCase } from './calculate.usecase';
import { CalculatorStrategy } from './strategy/calculator-strategy';
import { CalculateInputDto } from './dto/calculate.dto';
import { OperationType } from '../../domain/calculator/operation.types';
import { UserRepositoryInterface } from '../../domain/user/repository/user-repository.interface';
import { OperationRepositoryInterface } from '../../domain/calculator/repository/operation-repository.interface';
import { User } from '../../domain/user/entity/user';
import { Operation } from '../../domain/calculator/entity/operation';
import { RecordRepositoryInterface } from '../../domain/record/repository/record-repository.interface';
import { BalanceError } from '../../domain/user/error/balance.error';
import { EventDispatcherInterface } from 'arithmetic-packages';
import { LoggerFactory } from '../../infra/logger/logger-factory';
import { InvalidArgument } from '../../domain/calculator/error/invalid-argument';

jest.mock('typeorm-transactional', () => ({
  Transactional: () => () => ({}),
}));

describe('Calculate Use Case', () => {
  let calculateUseCase: CalculateUseCase;
  let calculatorStrategy: CalculatorStrategy;
  let userRepository: UserRepositoryInterface;
  let operationRepository: OperationRepositoryInterface;
  let recordRepository: RecordRepositoryInterface;
  let eventDispatcherInterface: EventDispatcherInterface;

  beforeEach(() => {
    calculatorStrategy = createMock<CalculatorStrategy>();
    userRepository = createMock<UserRepositoryInterface>();
    operationRepository = createMock<OperationRepositoryInterface>();
    recordRepository = createMock<RecordRepositoryInterface>();
    eventDispatcherInterface = createMock<EventDispatcherInterface>();

    calculateUseCase = new CalculateUseCase(
      calculatorStrategy,
      userRepository,
      operationRepository,
      recordRepository,
      eventDispatcherInterface,
      LoggerFactory.create(),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('must be defined', () => {
    expect(calculateUseCase).toBeDefined();
  });

  it('must calculate the operation', async () => {
    const input: CalculateInputDto = {
      identityProviderId: '123',
      operationType: OperationType.ADDITION,
      arguments: [1, 2],
    };
    const result = 3;

    const user = new User(1, 'email@email.com', 1, 100);
    const operation = new Operation(
      1,
      OperationType.ADDITION,
      'Addition',
      10,
      2,
    );

    jest
      .spyOn(userRepository, 'findByIdentityProviderId')
      .mockResolvedValueOnce(user);

    jest
      .spyOn(operationRepository, 'findByType')
      .mockResolvedValueOnce(operation);

    const dispatchSpy = jest.spyOn(eventDispatcherInterface, 'dispatch');
    const updateBalanceSpy = jest.spyOn(userRepository, 'updateBalance');
    const createRecordSpy = jest.spyOn(recordRepository, 'create');

    jest.spyOn(calculatorStrategy, 'calculate').mockReturnValueOnce(result);

    const output = await calculateUseCase.execute(input);
    expect(output).toEqual({ result, finalBalance: 90 });
    expect(user.getCurrentBalance()).toEqual(90);
    expect(updateBalanceSpy).toHaveBeenCalledWith(user);
    expect(createRecordSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalled();
  });

  it('must not calculate the operation when the user balance is not enough', async () => {
    const input: CalculateInputDto = {
      identityProviderId: '123',
      operationType: OperationType.ADDITION,
      arguments: [1, 2],
    };
    const user = new User(1, 'email@email.com', 1, 5);
    const operation = new Operation(
      1,
      OperationType.ADDITION,
      'Addition',
      5.1,
      2,
    );

    jest
      .spyOn(userRepository, 'findByIdentityProviderId')
      .mockResolvedValueOnce(user);

    jest
      .spyOn(operationRepository, 'findByType')
      .mockResolvedValueOnce(operation);

    const dispatchSpy = jest.spyOn(eventDispatcherInterface, 'dispatch');
    const updateBalanceSpy = jest.spyOn(userRepository, 'updateBalance');
    const createRecordSpy = jest.spyOn(recordRepository, 'create');

    const output = calculateUseCase.execute(input);
    await expect(output).rejects.toThrowError(
      'Your balance is not enough to spend $ 5.1',
    );
    await expect(output).rejects.toThrowError(BalanceError);
    expect(user.getCurrentBalance()).toEqual(5);
    expect(updateBalanceSpy).not.toHaveBeenCalled();
    expect(createRecordSpy).not.toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  describe('Argument Count Validation', () => {
    it('must calculate the operation when the correct number of arguments is provided', async () => {
      const input: CalculateInputDto = {
        identityProviderId: '123',
        operationType: OperationType.ADDITION,
        arguments: [1, 2], // Correct number of arguments
      };
      const result = 3;
      const user = new User(1, 'email@email.com', 1, 100);
      const operation = new Operation(
        1,
        OperationType.ADDITION,
        'Addition',
        10,
        2, // Expects 2 arguments
      );

      jest
        .spyOn(userRepository, 'findByIdentityProviderId')
        .mockResolvedValueOnce(user);
      jest
        .spyOn(operationRepository, 'findByType')
        .mockResolvedValueOnce(operation);
      jest.spyOn(calculatorStrategy, 'calculate').mockReturnValueOnce(result);

      const output = await calculateUseCase.execute(input);
      expect(output).toEqual({ result, finalBalance: 90 });
      expect(calculatorStrategy.calculate).toHaveBeenCalledWith(
        OperationType.ADDITION,
        1,
        2,
      );
    });

    it('must throw InvalidArgumentError when too few arguments are provided', async () => {
      const input: CalculateInputDto = {
        identityProviderId: '123',
        operationType: OperationType.ADDITION,
        arguments: [1], // Too few arguments
      };
      const user = new User(1, 'email@email.com', 1, 100);
      const operation = new Operation(
        1,
        OperationType.ADDITION,
        'Addition',
        10,
        2, // Expects 2 arguments
      );

      jest
        .spyOn(userRepository, 'findByIdentityProviderId')
        .mockResolvedValueOnce(user);
      jest
        .spyOn(operationRepository, 'findByType')
        .mockResolvedValueOnce(operation);

      await expect(calculateUseCase.execute(input)).rejects.toThrowError(
        new InvalidArgument(
          `Incorrect number of arguments for operation ${OperationType.ADDITION}. Expected 2, but received 1.`,
        ),
      );
      expect(calculatorStrategy.calculate).not.toHaveBeenCalled();
      expect(userRepository.updateBalance).not.toHaveBeenCalled();
      expect(recordRepository.create).not.toHaveBeenCalled();
    });

    it('must throw InvalidArgumentError when too many arguments are provided', async () => {
      const input: CalculateInputDto = {
        identityProviderId: '123',
        operationType: OperationType.SQUARE_ROOT,
        arguments: [1, 2, 3], // Too many arguments
      };
      const user = new User(1, 'email@email.com', 1, 100);
      // Square root operation typically expects 1 argument
      const operation = new Operation(
        1,
        OperationType.SQUARE_ROOT,
        'Square Root',
        15,
        1, // Expects 1 argument
      );

      jest
        .spyOn(userRepository, 'findByIdentityProviderId')
        .mockResolvedValueOnce(user);
      jest
        .spyOn(operationRepository, 'findByType')
        .mockResolvedValueOnce(operation);

      await expect(calculateUseCase.execute(input)).rejects.toThrowError(
        new InvalidArgument(
          `Incorrect number of arguments for operation ${OperationType.SQUARE_ROOT}. Expected 1, but received 3.`,
        ),
      );
      expect(calculatorStrategy.calculate).not.toHaveBeenCalled();
      expect(userRepository.updateBalance).not.toHaveBeenCalled();
      expect(recordRepository.create).not.toHaveBeenCalled();
    });
  });
});
