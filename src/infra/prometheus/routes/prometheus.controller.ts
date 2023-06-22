import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetRecordMetricsUseCase } from '../../../usecase/record/get-record-metrics.usecase';
import { RecordsMetricsPresenter } from './presenters/records-metrics.presenter';
import { GetNodeJsMetricsUseCase } from '../../../usecase/technical-metrics/get-nodejs-metrics.usecase';
import { GetTechnicalMetricsUseCase } from '../../../usecase/technical-metrics/get-technical-metrics.usecase';

@Controller('prometheus')
export class PrometheusController {
  constructor(
    private readonly getRecordMetricsUseCase: GetRecordMetricsUseCase,
    private readonly recordsMetricsPresenter: RecordsMetricsPresenter,
    private readonly getNodeJsMetricsUseCase: GetNodeJsMetricsUseCase,
    private readonly getTechnicalMetricsUseCase: GetTechnicalMetricsUseCase,
  ) {}

  @Get('/metrics/business')
  public async getBusinessMetrics(@Res() res: Response) {
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

  @Get('/metrics/nodejs')
  public async getNodeMetrics(@Res() res: Response) {
    const prometheusMetrics = await this.getNodeJsMetricsUseCase.execute();
    res.format({
      default: () => {
        res.set('Content-Type', prometheusMetrics.contentType);
        res.send(prometheusMetrics.metrics);
      },
    });
  }

  @Get('/metrics/technical')
  public async getTechnicalMetrics(@Res() res: Response) {
    const prometheusMetrics = await this.getTechnicalMetricsUseCase.execute();
    res.format({
      default: () => {
        res.set('Content-Type', prometheusMetrics.contentType);
        res.send(prometheusMetrics.metrics);
      },
    });
  }
}
