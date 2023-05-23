import { OperationRepositoryInterface } from "../../domain/calculator/repository/operation-repository.interface";
import { UserRepositoryInterface } from "../../domain/user/repository/user-repository.interface";
import { CalculateInputDto, CalculateOutputDto } from "./dto/calculate.dto";
import { CalculatorStrategy } from "./strategy/calculator-strategy";

export class CalculateUseCase {

  constructor(
    private readonly calculatorStrategy: CalculatorStrategy,
    private readonly userRepositoryInterface: UserRepositoryInterface,
    private readonly operationRepositoryInterface: OperationRepositoryInterface,
  ) {}

  public async execute(input: CalculateInputDto): Promise<CalculateOutputDto> {
    const { identityProviderId, operationType } = input;
    const user = await this.userRepositoryInterface.findByIdentityProviderId(identityProviderId);
    const operation = await this.operationRepositoryInterface.findByType(operationType);
    const result = this.calculatorStrategy.calculate(operationType, ...input.arguments);
    return { result };
  }


}
