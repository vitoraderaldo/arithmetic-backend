import {
  PromMetricCreationPayload,
  UpdateMetricPayload,
} from './prom-metric.interface';
import { PromRegisterName } from './prom-registry-name';

export interface PromClientInterface {
  createRegister(name: PromRegisterName): void;
  createGauge(payload: PromMetricCreationPayload): void;
  setGaugeValueAndLabel(payload: UpdateMetricPayload): void;
  getMetrics(registerName: PromRegisterName): Promise<string>;
  getContentType(): string;
  createAndSetNodeMetrics(registerName: PromRegisterName): void;
}
