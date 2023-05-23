import { Body, Controller, Post } from "@nestjs/common";
import { CalculateOutputDto } from "../../../usecase/calculator/dto/calculate.dto";
import { CalculateUseCase } from "../../../usecase/calculator/calculate.usecase";
import { CalculateAdditionRequest } from "./requests/calculate.request";
import { OperationType } from "../../../domain/calculator/operation.types";

@Controller('/calculator')
export class CalculatorController {
  constructor(
    private readonly calculateUseCase: CalculateUseCase,
  ) {}

  @Post('/add')
  public addNumbers(@Body() body: CalculateAdditionRequest): Promise<CalculateOutputDto> {
    return Promise.resolve(this.calculateUseCase.execute({
      operation: OperationType.ADDITION,
      arguments: body.arguments,
    }));
  }
}
