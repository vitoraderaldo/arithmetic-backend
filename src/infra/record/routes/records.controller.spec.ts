import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest'
import { RecordsController } from './records.controller';
import { SearchRecordsUseCase } from '../../../usecase/record/serch-records.usecase';
import { AuthGuard } from '../../guards/auth.guard';
import { SearchRecordsRequest } from './requests/search-records.request';
import { SearchRecordsOutputDto } from '../../../usecase/record/dto/search-records.dto';

describe('RecordsController', () => {
  let controller: RecordsController;
  let searchRecordsUseCase: SearchRecordsUseCase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RecordsController],
      providers: [
        {
          provide: SearchRecordsUseCase,
          useValue: createMock<SearchRecordsUseCase>(),
        }
      ],
    })
    .overrideGuard(AuthGuard)
    .useValue(createMock<AuthGuard>())
    .compile();

    controller = app.get<RecordsController>(RecordsController);
    searchRecordsUseCase = app.get<SearchRecordsUseCase>(SearchRecordsUseCase);
  });

  it('must create the controller successfully', () => {
    expect(controller).toBeDefined();
  });

  describe('Search', () => {
    it('must search records successfully', async () => {
      const currentDate = new Date();
      const params: SearchRecordsRequest = {
        operationId: 1,
        startDate: currentDate,
        endDate: currentDate,
        page: 1,
        pageSize: 10
      }
      const identityProviderId = '123';

      const result: SearchRecordsOutputDto = {
        records: [],
        pagination: {
          page: 1,
          pageSize: 10,
          pageTotal: 0,
          total: 0,
        }
      }

      jest
        .spyOn(searchRecordsUseCase, 'execute')
        .mockResolvedValue(result);

      const response = await controller.searchRecords(params, identityProviderId);
      expect(response).toEqual(result);
    });
  });
});
