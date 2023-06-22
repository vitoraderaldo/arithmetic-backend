import { PromMetricLabelEnum } from './prom-metric-label.enum';
import {
  StartTimerPayload,
  PromMetricCreationPayload,
  UpdateMetricPayload,
} from './prom-metric.interface';
import { PromRegisterName } from './prom-registry-name';

export interface PromClientInterface {
  createRegister(name: PromRegisterName): void;
  createGauge(payload: PromMetricCreationPayload): void;
  createHistogram(payload: PromMetricCreationPayload): void;
  startHistogramTimer(
    payload: StartTimerPayload,
  ): (labels?: Partial<Record<PromMetricLabelEnum, string>>) => number;
  setGaugeValueAndLabel(payload: UpdateMetricPayload): void;
  getMetrics(registerName: PromRegisterName): Promise<string>;
  getContentType(): string;
  createAndSetNodeMetrics(registerName: PromRegisterName): void;
}
