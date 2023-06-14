import { OperationRepositoryInterface } from '../../domain/calculator/repository/operation-repository.interface';
import { RecordRepositoryInterface } from '../../domain/record/repository/record-repository.interface';
import { UserRepositoryInterface } from '../../domain/user/repository/user-repository.interface';
import { CalculateInputDto, CalculateOutputDto } from './dto/calculate.dto';
import { CalculatorStrategy } from './strategy/calculator-strategy';
import { Record } from '../../domain/record/entity/record';
import { User } from '../../domain/user/entity/user';
import { Operation } from '../../domain/calculator/entity/operation';
import { Transactional } from '../../@shared/database/transactional.decorator';
import { EventDispatcherInterface, EventName } from 'arithmetic-packages';
import { OperationCalculatedEvent } from '../../domain/calculator/event/operation-calculated.event';
import { LoggerInterface } from '../../@shared/logger/logger.interface';

export class CalculateUseCase {
  constructor(
    private readonly calculatorStrategy: CalculatorStrategy,
    private readonly userRepository: UserRepositoryInterface,
    private readonly operationRepository: OperationRepositoryInterface,
    private readonly recordRepository: RecordRepositoryInterface,
    private readonly eventDispatcherInterface: EventDispatcherInterface,
    private readonly logger: LoggerInterface,
  ) {}

  @Transactional()
  public async execute(input: CalculateInputDto): Promise<CalculateOutputDto> {
    this.logger.info('Starting process to calculate operation', input);
    const [user, operation] = await this.getUserAndOperation(input);
    const result = await this.updateUserBalanceAndPerformCalculation(
      user,
      operation,
      input,
    );
    await this.saveOperationRecord(user, operation, result);
    await this.publishOperationCalculatedEvent(user, input, result.toString());
    this.logger.info('Finished process to calculate operation');
    return {
      result,
      finalBalance: Number(user.getCurrentBalance().toFixed(2)),
    };
  }

  private getUserAndOperation(
    input: CalculateInputDto,
  ): Promise<[User, Operation]> {
    const { identityProviderId, operationType } = input;
    return Promise.all([
      this.userRepository.findByIdentityProviderId(identityProviderId),
      this.operationRepository.findByType(operationType),
    ]);
  }

  private async updateUserBalanceAndPerformCalculation(
    user: User,
    operation: Operation,
    input: CalculateInputDto,
  ): Promise<number | string> {
    user.spendMoney(operation.getCost());
    const result = this.calculatorStrategy.calculate(
      operation.getType(),
      ...input.arguments,
    );
    await this.userRepository.updateBalance(user);
    return result;
  }

  private async saveOperationRecord(
    user: User,
    operation: Operation,
    result: number | string,
  ): Promise<void> {
    const record = Record.createNewRecord(user, operation, result.toString());
    await this.recordRepository.create(record);
  }

  private async publishOperationCalculatedEvent(
    user: User,
    input: CalculateInputDto,
    result: string,
  ) {
    this.logger.info('Publishing OPERATION_CALCULATED event');
    const event = new OperationCalculatedEvent({
      eventName: EventName.OPERATION_CALCULATED,
      data: {
        userId: user.getId(),
        operationType: input.operationType,
        arguments: input.arguments,
        result,
      },
    });
    await this.eventDispatcherInterface.dispatch(event);
    this.logger.info('Published OPERATION_CALCULATED event');
  }
}
