export interface FindOperationDto {
  id: number;
  name: string;
  cost: number;
  inputs: number;
}

export interface FindOperationsOutputDto {
  operations: FindOperationDto[];
}
