import { PromClientInterface } from '../interfaces/metrics/prom-client.interface';
import { PromMetricLabelEnum } from '../interfaces/metrics/prom-metric-label.enum';
import { PromMetricNameEnum } from '../interfaces/metrics/prom-metric-name.enum';
import { PromRegisterName } from '../interfaces/metrics/prom-registry-name';
import { PromClient } from './prom-client';

export class PromClientFactory {
  static create(): PromClientInterface {
    const client = new PromClient();
    this.createRegisters(client);
    this.createMetrics(client);
    return client;
  }

  private static createRegisters(client: PromClientInterface) {
    client.createRegister(PromRegisterName.BUSINESS);
    client.createRegister(PromRegisterName.NODEJS);
  }

  private static createMetrics(client: PromClientInterface): void {
    client.createGauge({
      metricName: PromMetricNameEnum.CALCULATION_TOTAL,
      metricHelp: 'Number of calculation requests by operation',
      labelNames: [PromMetricLabelEnum.OPERATION],
      registerName: PromRegisterName.BUSINESS,
    });
    client.createAndSetNodeMetrics(PromRegisterName.NODEJS);
  }
}
