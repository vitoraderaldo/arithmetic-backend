import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { Response } from 'express';
import { PrometheusController } from './prometheus.controller';
import { GetRecordMetricsUseCase } from '../../../usecase/record/get-record-metrics.usecase';
import { RecordsMetricsPresenter } from './presenters/records-metrics.presenter';
import { GetNodeJsMetricsUseCase } from '../../../usecase/technical-metrics/get-nodejs-metrics.usecase';
import { GetRecordMetricsOutputDto } from '../../../usecase/record/dto/record-metrics.dto';
import { NodeJsMetricsOutputDto } from '../../../usecase/technical-metrics/dto/node-js-metrics.dto';
import { GetTechnicalMetricsUseCase } from '../../../usecase/technical-metrics/get-technical-metrics.usecase';

describe('PrometheusController', () => {
  let controller: PrometheusController;

  let getRecordMetricsUseCase: GetRecordMetricsUseCase;
  let recordsMetricsPresenter: RecordsMetricsPresenter;
  let getNodeJsMetricsUseCase: GetNodeJsMetricsUseCase;
  let getTechnicalMetricsUseCase: GetTechnicalMetricsUseCase;

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
        {
          provide: GetTechnicalMetricsUseCase,
          useValue: createMock<GetTechnicalMetricsUseCase>(),
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
    getTechnicalMetricsUseCase = module.get<GetTechnicalMetricsUseCase>(
      GetTechnicalMetricsUseCase,
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

  it('must get technical metrics', async () => {
    const metrics = 'technical-metrics';

    const prometheusMetrics: NodeJsMetricsOutputDto = {
      metrics,
      contentType: 'application/text',
    };

    const executeSpy = jest
      .spyOn(getTechnicalMetricsUseCase, 'execute')
      .mockResolvedValueOnce(prometheusMetrics);

    const expressResponse = createMock<Response>();

    await controller.getTechnicalMetrics(expressResponse);
    expressResponse.format.mock.calls[0][0].default();

    const contentType = expressResponse.set.mock.calls[0][1];
    const body = expressResponse.send.mock.calls[0][0];

    expect(contentType).toEqual(prometheusMetrics.contentType);
    expect(body).toEqual(prometheusMetrics.metrics);

    expect(executeSpy).toHaveBeenCalledTimes(1);
  });
});
