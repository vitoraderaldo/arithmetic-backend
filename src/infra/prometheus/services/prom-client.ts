import { Gauge, register } from 'prom-client';
import { PromClientInterface } from '../interfaces/metrics/prom-client.interface';
import {
  PromMetricCreationPayload,
  UpdateMetricPayload,
} from '../interfaces/metrics/prom-metric.interface';

export class PromClient implements PromClientInterface {
  getContentType(): string {
    return register.contentType;
  }

  createGauge(payload: PromMetricCreationPayload): void {
    const metricData = {
      name: payload.metricName,
      help: payload.metricHelp,
      labelNames: payload.labelNames,
      //registers: [businessRegistry]
    };
    new Gauge(metricData);
  }

  setGaugeValueAndLabel(payload: UpdateMetricPayload): void {
    const metric = register.getSingleMetric(
      payload.metricName,
    ) as Gauge<string>;
    metric.set(payload.labels, payload.value);
  }

  getMetrics(): Promise<string> {
    return register.metrics();
  }
}
