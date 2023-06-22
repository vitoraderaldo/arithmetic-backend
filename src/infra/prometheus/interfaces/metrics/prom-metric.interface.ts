import { PromMetricLabelEnum } from './prom-metric-label.enum';
import { PromMetricNameEnum } from './prom-metric-name.enum';

export interface PromMetricCreationPayload {
  metricName: PromMetricNameEnum;
  metricHelp: string;
  labelNames: PromMetricLabelEnum[];
}

export interface UpdateMetricPayload {
  metricName: PromMetricNameEnum;
  labels: Record<PromMetricLabelEnum, string>;
  value: number;
}

export interface GaugeInterface {
  set(value: number, labels?: Record<PromMetricLabelEnum, string>): void;
}
