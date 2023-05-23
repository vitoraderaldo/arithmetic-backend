import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CalculateOutputDto } from "../../../usecase/calculator/dto/calculate.dto";
import { CalculateUseCase } from "../../../usecase/calculator/calculate.usecase";
import { CalculateAdditionRequest } from "./requests/calculate.request";
import { OperationType } from "../../../domain/calculator/operation.types";
import { AuthGuard } from "../../guards/auth.guard";
import { IdentityProviderId } from "../../guards/identity-provider-id.decorator";

@UseGuards(AuthGuard)
@Controller('/calculator')
export class CalculatorController {
  constructor(
    private readonly calculateUseCase: CalculateUseCase,
  ) {}

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
