import { OperationType } from "../../../domain/calculator/operation.types";

export interface CalculateInputDto {
  identityProviderId: string,
  operationType: OperationType,
  arguments: number[] | string[]
}

export interface CalculateOutputDto {
  result: number | string
}
