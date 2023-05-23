import { OperationType } from "../../../domain/calculator/operation.types";

export interface CalculateInputDto {
  operation: OperationType,
  arguments: number[] | string[]
}

export interface CalculateOutputDto {
  result: number | string
}
