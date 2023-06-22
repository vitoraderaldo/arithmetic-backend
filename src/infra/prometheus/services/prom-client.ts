import {
  Gauge,
  Registry,
  collectDefaultMetrics,
  register as defaultRegister,
} from 'prom-client';
import { PromClientInterface } from '../interfaces/metrics/prom-client.interface';
import {
  PromMetricCreationPayload,
  UpdateMetricPayload,
} from '../interfaces/metrics/prom-metric.interface';
import { PromRegisterName } from '../interfaces/metrics/prom-registry-name';

export class PromClient implements PromClientInterface {
  private registers: Map<PromRegisterName, Registry> = new Map();

  createRegister(name: PromRegisterName): void {
    const register = new Registry();
    this.registers.set(name, register);
  }

  getContentType(): string {
    return defaultRegister.contentType;
  }

  createGauge(payload: PromMetricCreationPayload): void {
    const register = this.registers.get(payload.registerName);
    const metricData = {
      name: payload.metricName,
      help: payload.metricHelp,
      labelNames: payload.labelNames,
      registers: [register],
    };
    new Gauge(metricData);
  }

  setGaugeValueAndLabel(payload: UpdateMetricPayload): void {
    const register = this.registers.get(payload.registerName);
    const metric = register.getSingleMetric(
      payload.metricName,
    ) as Gauge<string>;
    metric.set(payload.labels, payload.value);
  }

  getMetrics(registerName: PromRegisterName): Promise<string> {
    const register = this.registers.get(registerName);
    return register.metrics();
  }

  createAndSetNodeMetrics(registerName: PromRegisterName): void {
    const register = this.registers.get(registerName);
    collectDefaultMetrics({ register });
  }
}
