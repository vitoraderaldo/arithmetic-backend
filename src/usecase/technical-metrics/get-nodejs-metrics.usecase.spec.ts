import { createMock } from '@golevelup/ts-jest';
import { PromClientInterface } from '../../infra/prometheus/interfaces/metrics/prom-client.interface';
import { GetNodeJsMetricsUseCase } from './get-nodejs-metrics.usecase';
import { PromRegisterName } from '../../infra/prometheus/interfaces/metrics/prom-registry-name';

describe('GetNodeJsMetricsUseCase', () => {
  let promClient: PromClientInterface;
  let useCase: GetNodeJsMetricsUseCase;

  beforeEach(() => {
    promClient = createMock<PromClientInterface>();
    useCase = new GetNodeJsMetricsUseCase(promClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('must return nodejs metrics', async () => {
    const metrics = 'node-js-metric-in-text';
    const contentType = 'application/text';

    const getMetricsSpy = jest
      .spyOn(promClient, 'getMetrics')
      .mockResolvedValue(metrics);

    jest.spyOn(promClient, 'getContentType').mockReturnValue(contentType);

    const response = await useCase.execute();
    expect(response).toEqual({ metrics, contentType });
    expect(getMetricsSpy).toHaveBeenCalledWith(PromRegisterName.NODEJS);
  });
});
