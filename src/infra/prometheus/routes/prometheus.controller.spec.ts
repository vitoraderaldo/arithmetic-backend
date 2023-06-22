import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { PrometheusController } from './prometheus.controller';
import { GetRecordMetricsUseCase } from '../../../usecase/record/get-record-metrics.usecase';
import { RecordsMetricsPresenter } from './presenters/records-metrics.presenter';
import { GetNodeJsMetricsUseCase } from '../../../usecase/technical-metrics/get-nodejs-metrics.usecase';

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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
