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
    client.createRegister(PromRegisterName.TECHNICAL);
  }

  private static createMetrics(client: PromClientInterface): void {
    client.createGauge({
      metricName: PromMetricNameEnum.CALCULATION_TOTAL,
      metricHelp: 'Number of calculation requests by operation',
      labelNames: [PromMetricLabelEnum.OPERATION],
      registerName: PromRegisterName.BUSINESS,
    });
    client.createGauge({
      metricName: PromMetricNameEnum.DELETED_RECORDS_TOTAL,
      metricHelp: 'Number of deleted records by operation',
      labelNames: [PromMetricLabelEnum.OPERATION],
      registerName: PromRegisterName.BUSINESS,
    });

    client.createHistogram({
      metricName: PromMetricNameEnum.REQUEST_TIME_DURATION,
      metricHelp: 'Duration of HTTP requests in ZZZ',
      labelNames: [
        PromMetricLabelEnum.ROUTE,
        PromMetricLabelEnum.STATUS_CODE,
        PromMetricLabelEnum.METHOD,
      ],
      registerName: PromRegisterName.TECHNICAL,
    });
    client.createAndSetNodeMetrics(PromRegisterName.NODEJS);
  }
}
