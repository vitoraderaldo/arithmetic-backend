import { UserRepositoryInterface } from "../../domain/user/repository/user-repository.interface";
import { CalculateInputDto, CalculateOutputDto } from "./dto/calculate.dto";
import { CalculatorStrategy } from "./strategy/calculator-strategy";

export class CalculateUseCase {

  constructor(
    private readonly calculatorStrategy: CalculatorStrategy,
    private readonly userRepositoryInterface: UserRepositoryInterface,
  ) {}

  public async execute(input: CalculateInputDto): Promise<CalculateOutputDto> {
    const { identityProviderId, operation } = input;
    const user = await this.userRepositoryInterface.findByIdentityProviderId(identityProviderId);
    const result = this.calculatorStrategy.calculate(operation, ...input.arguments);
    return { result };
  }


}
