import { OperationRepositoryInterface } from "../../domain/calculator/repository/operation-repository.interface";
import { RecordRepositoryInterface } from "../../domain/record/repository/record-repository.interface";
import { UserRepositoryInterface } from "../../domain/user/repository/user-repository.interface";
import { CalculateInputDto, CalculateOutputDto } from "./dto/calculate.dto";
import { CalculatorStrategy } from "./strategy/calculator-strategy";
import { Record } from '../../domain/record/entity/record'
import { User } from "../../domain/user/entity/user";
import { Operation } from "../../domain/calculator/entity/operation";

export class CalculateUseCase {

  constructor(
    private readonly calculatorStrategy: CalculatorStrategy,
    private readonly userRepository: UserRepositoryInterface,
    private readonly operationRepository: OperationRepositoryInterface,
    private readonly recordRepository: RecordRepositoryInterface,
  ) {}

  public async execute(input: CalculateInputDto): Promise<CalculateOutputDto> {
    const [ user, operation ] = await this.getUserAndOperation(input);
    const result = await this.updateUserBalanceAndPerformCalculation(user, operation, input)
    await this.saveOperationRecord(user, operation, result);
    return { result };
  }

  private getUserAndOperation(input: CalculateInputDto): Promise<[User, Operation]> {
    const { identityProviderId, operationType } = input;
    return Promise.all([
      this.userRepository.findByIdentityProviderId(identityProviderId),
      this.operationRepository.findByType(operationType),
    ])
  }

  private async updateUserBalanceAndPerformCalculation(user: User, operation: Operation, input: CalculateInputDto): Promise<number> {
    user.spendMoney(operation.getCost());
    const result = this.calculatorStrategy.calculate(operation.getType(), ...input.arguments);
    await this.userRepository.updateBalance(user);
    return result
  }

  private async saveOperationRecord(user: User, operation: Operation, result: number): Promise<void> {
    const record = Record.createNewRecord(user, operation, result.toString());
    await this.recordRepository.create(record);
  }

}
