import { createMock } from '@golevelup/ts-jest';
import { RecordRepositoryInterface } from '../../domain/record/repository/record-repository.interface';
import { GetRecordMetricsUseCase } from './get-record-metrics.usecase';
import { RecordMetrics } from '../../domain/record/repository/repository.dto';

describe('GetRecordMetricsUsecase', () => {
  let useCase: GetRecordMetricsUseCase;
  let recordRepository: RecordRepositoryInterface;

  beforeEach(() => {
    recordRepository = createMock<RecordRepositoryInterface>();
    useCase = new GetRecordMetricsUseCase(recordRepository);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('should return metrics', async () => {
    const metric1: RecordMetrics = {
      operationId: 1,
      operationName: 'Addition',
      totalAmount: 50,
      totalDeletedAmount: 3,
    };
    const metric2: RecordMetrics = {
      operationId: 2,
      operationName: 'Subtraction',
      totalAmount: 20,
      totalDeletedAmount: 1,
    };
    const metrics = [metric1, metric2];

    jest.spyOn(recordRepository, 'getMetrics').mockResolvedValueOnce(metrics);

    const response = await useCase.execute();
    expect(response).toEqual({
      metrics: {
        calculations: [
          { operationName: 'Addition', total: 50 },
          { operationName: 'Subtraction', total: 20 },
        ],
        deletedRecords: [
          { operationName: 'Addition', total: 3 },
          { operationName: 'Subtraction', total: 1 },
        ],
      },
    });
  });
});
