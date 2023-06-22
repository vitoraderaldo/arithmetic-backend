import { createMock } from '@golevelup/ts-jest';
import { PromClientInterface } from '../../infra/prometheus/interfaces/metrics/prom-client.interface';
import { GetTechnicalMetricsUseCase } from './get-technical-metrics.usecase';
import { PromRegisterName } from '../../infra/prometheus/interfaces/metrics/prom-registry-name';

describe('GetTechnicalMetricsUseCase', () => {
  let promClient: PromClientInterface;
  let useCase: GetTechnicalMetricsUseCase;

  beforeEach(() => {
    promClient = createMock<PromClientInterface>();
    useCase = new GetTechnicalMetricsUseCase(promClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('must return technical metrics', async () => {
    const metrics = 'technical-metrics-in-text';
    const contentType = 'application/text';

    const getMetricsSpy = jest
      .spyOn(promClient, 'getMetrics')
      .mockResolvedValue(metrics);

    jest.spyOn(promClient, 'getContentType').mockReturnValue(contentType);

    const response = await useCase.execute();
    expect(response).toEqual({ metrics, contentType });
    expect(getMetricsSpy).toHaveBeenCalledWith(PromRegisterName.TECHNICAL);
  });
});
