import { GetRecordMetricsOutputDto } from '../../../../usecase/record/dto/record-metrics.dto';
import { PromMetricNameEnum } from '../../interfaces/metrics/prom-metric-name.enum';
import { PromClientInterface } from '../../interfaces/metrics/prom-client.interface';

export class RecordsMetricsPresenter {
  constructor(private readonly promClient: PromClientInterface) {}

  async toPrometheus(data: GetRecordMetricsOutputDto): Promise<{
    body: string;
    contentType: string;
  }> {
    data.metrics.calculations.forEach((calculation) => {
      this.promClient.setGaugeValueAndLabel({
        metricName: PromMetricNameEnum.CALCULATION_TOTAL,
        labels: { operation: calculation.operationName },
        value: calculation.total,
      });
    });
    const body = await this.promClient.getMetrics();
    const contentType = this.promClient.getContentType();
    return { body, contentType };
  }
}
