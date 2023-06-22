import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { Response } from 'express';
import { PrometheusController } from './prometheus.controller';
import { GetRecordMetricsUseCase } from '../../../usecase/record/get-record-metrics.usecase';
import { RecordsMetricsPresenter } from './presenters/records-metrics.presenter';
import { GetNodeJsMetricsUseCase } from '../../../usecase/technical-metrics/get-nodejs-metrics.usecase';
import { GetRecordMetricsOutputDto } from '../../../usecase/record/dto/record-metrics.dto';
import { NodeJsMetricsOutputDto } from '../../../usecase/technical-metrics/dto/node-js-metrics.dto';

describe('PrometheusController', () => {
  let controller: PrometheusController;

  let getRecordMetricsUseCase: GetRecordMetricsUseCase;
  let recordsMetricsPresenter: RecordsMetricsPresenter;
  let getNodeJsMetricsUseCase: GetNodeJsMetricsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrometheusController],
      providers: [
        {
          provide: GetRecordMetricsUseCase,
          useValue: createMock<GetRecordMetricsUseCase>(),
        },
        {
          provide: RecordsMetricsPresenter,
          useValue: createMock<RecordsMetricsPresenter>(),
        },
        {
          provide: GetNodeJsMetricsUseCase,
          useValue: createMock<GetNodeJsMetricsUseCase>(),
        },
      ],
    }).compile();

    controller = module.get<PrometheusController>(PrometheusController);
    getRecordMetricsUseCase = module.get<GetRecordMetricsUseCase>(
      GetRecordMetricsUseCase,
    );
    recordsMetricsPresenter = module.get<RecordsMetricsPresenter>(
      RecordsMetricsPresenter,
    );
    getNodeJsMetricsUseCase = module.get<GetNodeJsMetricsUseCase>(
      GetNodeJsMetricsUseCase,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('must get business metrics', async () => {
    const metrics: GetRecordMetricsOutputDto = null;

    const prometheusMetrics = {
      contentType: 'application/text',
      body: 'null-in-text/prometheus-format',
    };

    const executeSpy = jest
      .spyOn(getRecordMetricsUseCase, 'execute')
      .mockResolvedValueOnce(metrics);

    const toPrometheusSpy = jest
      .spyOn(recordsMetricsPresenter, 'toPrometheus')
      .mockResolvedValueOnce(prometheusMetrics);

    const expressResponse = createMock<Response>();

    await controller.getBusinessMetrics(expressResponse);
    expressResponse.format.mock.calls[0][0].default();

    const contentType = expressResponse.set.mock.calls[0][1];
    const body = expressResponse.send.mock.calls[0][0];

    expect(contentType).toEqual(prometheusMetrics.contentType);
    expect(body).toEqual(prometheusMetrics.body);

    expect(executeSpy).toHaveBeenCalledTimes(1);
    expect(toPrometheusSpy).toHaveBeenCalledWith(metrics);
  });

  it('must get nodejs metrics', async () => {
    const metrics = 'node-js-metrics';

    const prometheusMetrics: NodeJsMetricsOutputDto = {
      metrics,
      contentType: 'application/text',
    };

    const executeSpy = jest
      .spyOn(getNodeJsMetricsUseCase, 'execute')
      .mockResolvedValueOnce(prometheusMetrics);

    const expressResponse = createMock<Response>();

    await controller.getNodeMetrics(expressResponse);
    expressResponse.format.mock.calls[0][0].default();

    const contentType = expressResponse.set.mock.calls[0][1];
    const body = expressResponse.send.mock.calls[0][0];

    expect(contentType).toEqual(prometheusMetrics.contentType);
    expect(body).toEqual(prometheusMetrics.metrics);

    expect(executeSpy).toHaveBeenCalledTimes(1);
  });
});
