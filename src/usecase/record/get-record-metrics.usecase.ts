import { RecordRepositoryInterface } from '../../domain/record/repository/record-repository.interface';
import {
  GetRecordMetricsOutputDto,
  OperationTotal,
} from './dto/record-metrics.dto';

export class GetRecordMetricsUseCase {
  constructor(private readonly recordRepository: RecordRepositoryInterface) {}

  async execute(): Promise<GetRecordMetricsOutputDto> {
    const calculationMetrics: OperationTotal[] = [];
    const deletedRecordMetrics: OperationTotal[] = [];

    const metrics = await this.recordRepository.getMetrics();

    metrics.forEach((metric) => {
      calculationMetrics.push({
        operationName: metric.operationName,
        total: metric.totalAmount,
      });
      deletedRecordMetrics.push({
        operationName: metric.operationName,
        total: metric.totalDeletedAmount,
      });
    });

    const output: GetRecordMetricsOutputDto = {
      metrics: {
        calculations: calculationMetrics,
        deletedRecords: deletedRecordMetrics,
      },
    };
    return output;
  }
}
