import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetRecordMetricsUseCase } from '../../../usecase/record/get-record-metrics.usecase';
import { RecordsMetricsPresenter } from './presenters/records-metrics.presenter';

@Controller('prometheus')
export class PrometheusController {
  constructor(
    private readonly getRecordMetricsUseCase: GetRecordMetricsUseCase,
    private readonly recordsMetricsPresenter: RecordsMetricsPresenter,
  ) {}

  @Get('/metrics')
  public async metrics(@Res() res: Response) {
    const metrics = await this.getRecordMetricsUseCase.execute();
    const prometheusMetrics = await this.recordsMetricsPresenter.toPrometheus(
      metrics,
    );
    res.format({
      default: () => {
        res.set('Content-Type', prometheusMetrics.contentType);
        res.send(prometheusMetrics.body);
      },
    });
  }
}
