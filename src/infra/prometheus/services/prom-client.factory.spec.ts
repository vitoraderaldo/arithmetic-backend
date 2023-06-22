import { PromClientFactory } from './prom-client.factory';
import { PromClient } from './prom-client';
import { PromRegisterName } from '../interfaces/metrics/prom-registry-name';

describe('PromClientFactory', () => {
  it('must create a prometheus client and configure the registers and metrics', async () => {
    const client = PromClientFactory.create();
    expect(client).toBeInstanceOf(PromClient);

    const contentType = client.getContentType();
    const businessMetrics = await client.getMetrics(PromRegisterName.BUSINESS);
    const technicalMetrics = await client.getMetrics(
      PromRegisterName.TECHNICAL,
    );
    const nodeJsMetrics = await client.getMetrics(PromRegisterName.NODEJS);

    expect(nodeJsMetrics).toContain('nodejs_heap_size_total_bytes');
    expect(businessMetrics).toContain('app_calculator_calculation_total');
    expect(businessMetrics).toContain('app_calculator_deleted_records_total');
    expect(technicalMetrics).toContain('app_calculator_request_time_duration');
    expect(contentType).toEqual('text/plain; version=0.0.4; charset=utf-8');
  });
});
