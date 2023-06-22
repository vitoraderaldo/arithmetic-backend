import { PromClientInterface } from '../interfaces/metrics/prom-client.interface';
import { PromMetricLabelEnum } from '../interfaces/metrics/prom-metric-label.enum';
import { PromMetricNameEnum } from '../interfaces/metrics/prom-metric-name.enum';
import { PromClient } from './prom-client';

export class PromClientFactory {
  static create(): PromClientInterface {
    const client = new PromClient();
    this.createMetrics(client);
    return client;
  }

  private static createMetrics(client: PromClientInterface): void {
    client.createGauge({
      metricName: PromMetricNameEnum.CALCULATION_TOTAL,
      metricHelp: 'Number of calculation requests by operation',
      labelNames: [PromMetricLabelEnum.OPERATION],
    });
  }
}
