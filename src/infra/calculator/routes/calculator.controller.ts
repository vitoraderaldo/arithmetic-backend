import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CalculateOutputDto } from "../../../usecase/calculator/dto/calculate.dto";
import { CalculateUseCase } from "../../../usecase/calculator/calculate.usecase";
import { CalculateAdditionRequest } from "./requests/calculate.request";
import { OperationType } from "../../../domain/calculator/operation.types";
import { AuthGuard } from "../../guards/auth.guard";
import { IdentityProviderId } from "../../guards/identity-provider-id.decorator";
import { FindOperationsUseCase } from "../../../usecase/calculator/find-operations.usecase";
import { FindOperationsOutputDto } from "../../../usecase/calculator/dto/operation.dto";

@UseGuards(AuthGuard)
@Controller('/calculator')
export class CalculatorController {
  constructor(
    private readonly calculateUseCase: CalculateUseCase,
    private readonly findOperationsUseCase: FindOperationsUseCase,
  ) {}

  @Get('/operations')
  public findOperations(): Promise<FindOperationsOutputDto> {
    return this.findOperationsUseCase.execute();
  }

  @Post('/add')
  public addNumbers(
    @IdentityProviderId() identityProviderId: string,
    @Body() body: CalculateAdditionRequest
  ): Promise<CalculateOutputDto> {
    return this.calculateUseCase.execute({
      identityProviderId,
      operationType: OperationType.ADDITION,
      arguments: body.arguments,
    });
  }
}
