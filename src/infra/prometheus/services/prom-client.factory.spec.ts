import { PromClientFactory } from './prom-client.factory';
import { PromClient } from './prom-client';
import { PromRegisterName } from '../interfaces/metrics/prom-registry-name';

describe('PromClientFactory', () => {
  it('must create a prometheus client and configure the registers and metrics', async () => {
    const client = PromClientFactory.create();
    expect(client).toBeInstanceOf(PromClient);

    const contentType = client.getContentType();
    const businessMetrics = await client.getMetrics(PromRegisterName.BUSINESS);
    const nodeJsMetrics = await client.getMetrics(PromRegisterName.NODEJS);

    expect(nodeJsMetrics).toContain('nodejs_heap_size_total_bytes');
    expect(businessMetrics).toContain('app_calculator_calculation_total');
    expect(contentType).toEqual('text/plain; version=0.0.4; charset=utf-8');
  });
});
