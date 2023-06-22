import {
  PromMetricCreationPayload,
  UpdateMetricPayload,
} from './prom-metric.interface';

export interface PromClientInterface {
  createGauge(payload: PromMetricCreationPayload): void;
  setGaugeValueAndLabel(payload: UpdateMetricPayload): void;
  getMetrics(): Promise<string>;
  getContentType(): string;
}
