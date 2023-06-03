import { Test, TestingModule } from '@nestjs/testing';
import { createMock } from '@golevelup/ts-jest';
import { Response } from 'express';
import { RecordsController } from './records.controller';
import { SearchRecordsUseCase } from '../../../usecase/record/serch-records.usecase';
import { AuthGuard } from '../../guards/auth.guard';
import {
  SearchRecordsRequest,
  SortDirectionRequest,
  SortOptionRequest,
} from './requests/search-records.request';
import { SearchRecordsOutputDto } from '../../../usecase/record/dto/search-records.dto';
import { DeleteRecordUseCase } from '../../../usecase/record/delete-record.usecase';

describe('RecordsController', () => {
  let controller: RecordsController;
  let searchRecordsUseCase: SearchRecordsUseCase;
  let deleteRecordUseCase: DeleteRecordUseCase;
  let response: Response;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RecordsController],
      providers: [
        {
          provide: SearchRecordsUseCase,
          useValue: createMock<SearchRecordsUseCase>(),
        },
        {
          provide: DeleteRecordUseCase,
          useValue: createMock<DeleteRecordUseCase>(),
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(createMock<AuthGuard>())
      .compile();

    controller = app.get<RecordsController>(RecordsController);
    searchRecordsUseCase = app.get<SearchRecordsUseCase>(SearchRecordsUseCase);
    deleteRecordUseCase = app.get<DeleteRecordUseCase>(DeleteRecordUseCase);
    response = createMock<Response>();
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
        pageSize: 10,
        sortBy: SortOptionRequest.dateCreated,
        sortDirection: SortDirectionRequest.asc,
      };
      const identityProviderId = '123';

      const result: SearchRecordsOutputDto = {
        records: [],
        pagination: {
          page: 1,
          pageSize: 10,
          pageTotal: 0,
          total: 0,
        },
      };

      const searchSpy = jest
        .spyOn(searchRecordsUseCase, 'execute')
        .mockResolvedValue(result);

      await controller.searchRecords(params, identityProviderId, response);
      expect(searchSpy).toBeCalled();
    });
  });

  describe('Delete', () => {
    it('must delete record by id successfully', async () => {
      const recordId = '1';
      const identityProviderId = '123';

      const result = { recordId: recordId };

      jest.spyOn(deleteRecordUseCase, 'execute').mockResolvedValue(result);

      const response = await controller.deleteRecord(
        recordId,
        identityProviderId,
      );
      expect(response).toEqual(result);
    });
  });
});
