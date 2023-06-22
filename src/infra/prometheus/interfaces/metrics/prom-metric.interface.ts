import { PromMetricLabelEnum } from './prom-metric-label.enum';
import { PromMetricNameEnum } from './prom-metric-name.enum';
import { PromRegisterName } from './prom-registry-name';

export interface PromMetricCreationPayload {
  metricName: PromMetricNameEnum;
  metricHelp: string;
  labelNames: PromMetricLabelEnum[];
  registerName: PromRegisterName;
}

export interface UpdateMetricPayload {
  registerName: PromRegisterName;
  metricName: PromMetricNameEnum;
  labels: Record<PromMetricLabelEnum, string>;
  value: number;
}

export interface GaugeInterface {
  set(value: number, labels?: Record<PromMetricLabelEnum, string>): void;
}
