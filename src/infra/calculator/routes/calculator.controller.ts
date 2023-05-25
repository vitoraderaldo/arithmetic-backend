import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CalculateOutputDto } from "../../../usecase/calculator/dto/calculate.dto";
import { CalculateUseCase } from "../../../usecase/calculator/calculate.usecase";
import { CalculateAdditionRequest, CalculateDivisionRequest, CalculateMultiplicationRequest, CalculateSquareRootRequest, CalculateSubtractionRequest } from "./requests/calculate.request";
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

  @Post('/addition')
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

  @Post('/subtraction')
  public subtractNumbers(
    @IdentityProviderId() identityProviderId: string,
    @Body() body: CalculateSubtractionRequest
  ): Promise<CalculateOutputDto> {
    return this.calculateUseCase.execute({
      identityProviderId,
      operationType: OperationType.SUBTRACTION,
      arguments: body.arguments,
    });
  }

  @Post('/multiplication')
  public multiplyNumbers(
    @IdentityProviderId() identityProviderId: string,
    @Body() body: CalculateMultiplicationRequest
  ): Promise<CalculateOutputDto> {
    return this.calculateUseCase.execute({
      identityProviderId,
      operationType: OperationType.MULTIPLICATION,
      arguments: body.arguments,
    });
  }

  @Post('/division')
  public divideNumbers(
    @IdentityProviderId() identityProviderId: string,
    @Body() body: CalculateDivisionRequest
  ): Promise<CalculateOutputDto> {
    return this.calculateUseCase.execute({
      identityProviderId,
      operationType: OperationType.DIVISION,
      arguments: body.arguments,
    });
  }

  @Post('/square-root')
  public calculateSquareRoot(
    @IdentityProviderId() identityProviderId: string,
    @Body() body: CalculateSquareRootRequest
  ): Promise<CalculateOutputDto> {
    return this.calculateUseCase.execute({
      identityProviderId,
      operationType: OperationType.SQUARE_ROOT,
      arguments: body.arguments,
    });
  }

  @Post('/random-string')
  public generateRandomString(
    @IdentityProviderId() identityProviderId: string,
  ): Promise<CalculateOutputDto> {
    return this.calculateUseCase.execute({
      identityProviderId,
      operationType: OperationType.RANDOM_STRING,
      arguments: [],
    });
  }

}
