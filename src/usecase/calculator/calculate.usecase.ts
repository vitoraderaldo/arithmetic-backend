import { CalculateInputDto, CalculateOutputDto } from "./dto/calculate.dto";
import { CalculatorStrategy } from "./strategy/calculator-strategy";

export class CalculateUseCase {

  constructor(
    private readonly calculatorStrategy: CalculatorStrategy
  ) {}

  public execute(input: CalculateInputDto): CalculateOutputDto {
    const result = this.calculatorStrategy.calculate(input.operation, ...input.arguments);
    return { result };
  }


}
