import { PromClientInterface } from '../../infra/prometheus/interfaces/metrics/prom-client.interface';
import { PromRegisterName } from '../../infra/prometheus/interfaces/metrics/prom-registry-name';
import { NodeJsMetricsOutputDto } from './dto/node-js-metrics.dto';

export class GetTechnicalMetricsUseCase {
  constructor(private readonly promClient: PromClientInterface) {}

  async execute(): Promise<NodeJsMetricsOutputDto> {
    const metrics = await this.promClient.getMetrics(
      PromRegisterName.TECHNICAL,
    );
    const contentType = this.promClient.getContentType();
    return { metrics, contentType };
  }
}
