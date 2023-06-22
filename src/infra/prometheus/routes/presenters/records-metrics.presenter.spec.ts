import { createMock } from '@golevelup/ts-jest';
import { PromClientInterface } from '../../interfaces/metrics/prom-client.interface';
import { RecordsMetricsPresenter } from './records-metrics.presenter';
import { GetRecordMetricsOutputDto } from '../../../../usecase/record/dto/record-metrics.dto';

describe('RecordsMetricsPresenter', () => {
  let sut: RecordsMetricsPresenter;
  let promClient: PromClientInterface;

  beforeEach(() => {
    promClient = createMock<PromClientInterface>();
    sut = new RecordsMetricsPresenter(promClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('must convert record metric data to prometheus format', async () => {
    const data: GetRecordMetricsOutputDto = {
      metrics: {
        calculations: [
          { operationName: 'Multiplication', total: 10 },
          { operationName: 'Division', total: 5 },
        ],
        deletedRecords: [
          { operationName: 'Multiplication', total: 2 },
          { operationName: 'Multiplication', total: 1 },
        ],
      },
    };

    const prometheusMetrics = 'metric-in-text-format';
    const prometheusContentType = 'text/plain';

    const setGaugeSpy = jest.spyOn(promClient, 'setGaugeValueAndLabel');
    const getMetricsSpy = jest
      .spyOn(promClient, 'getMetrics')
      .mockResolvedValueOnce(prometheusMetrics);
    jest
      .spyOn(promClient, 'getContentType')
      .mockReturnValueOnce(prometheusContentType);

    const result = await sut.toPrometheus(data);
    expect(result).toEqual({
      body: prometheusMetrics,
      contentType: prometheusContentType,
    });

    expect(setGaugeSpy).toHaveBeenCalledTimes(2);
    expect(setGaugeSpy).toHaveBeenNthCalledWith(1, {
      metricName: 'app_calculator_calculation_total',
      labels: { operation: 'Multiplication' },
      value: 10,
      registerName: 'business',
    });
    expect(getMetricsSpy).toHaveBeenCalledWith('business');
  });
});
