export class OperationTotal {
  operationName: string;
  total: number;
}

export interface GetRecordMetricsOutputDto {
  metrics: {
    calculations: OperationTotal[];
    deletedRecords: OperationTotal[];
  };
}
