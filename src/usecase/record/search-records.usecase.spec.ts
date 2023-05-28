import { createMock } from "@golevelup/ts-jest";
import { RecordRepositoryInterface } from "../../domain/record/repository/record-repository.interface";
import { UserRepositoryInterface } from "../../domain/user/repository/user-repository.interface";
import { SearchRecordsUseCase } from "./serch-records.usecase";
import { SearchRecordsInputDto } from "./dto/search-records.dto";
import { User } from "../../domain/user/entity/user";
import { PaginatedResult } from "../../@shared/interface/paginated-result";
import { Record } from "../../domain/record/entity/record";
import { Operation } from "../../domain/calculator/entity/operation";
import { OperationType } from "../../domain/calculator/operation.types";
import { OperationRepositoryInterface } from "../../domain/calculator/repository/operation-repository.interface";

describe('SearchRecordsUseCase', () => {

  let useCase: SearchRecordsUseCase;
  let recordRepository: RecordRepositoryInterface
  let userRepository: UserRepositoryInterface
  let operationRepository: OperationRepositoryInterface

  beforeEach(() => {
    recordRepository = createMock<RecordRepositoryInterface>();
    userRepository = createMock<UserRepositoryInterface>();
    operationRepository = createMock<OperationRepositoryInterface>();
    useCase = new SearchRecordsUseCase(recordRepository, userRepository, operationRepository);
  })

  it('must be defined', () => {
    expect(useCase).toBeDefined();
  })

  it('must search records', async () => {
    const currentDate = new Date();
    const input: SearchRecordsInputDto = {
      filter: { 
        identityProviderId: '123', operationId: 1, 
        startDate: currentDate, endDate: currentDate 
      },
      pagination: { page: 1, pageSize: 10},
      sort: { field: 'operationId', order: 'asc' }
    }

    const user = new User(1, 'vitor@email.com', 1, 100);
    const addOperation = new Operation(1, OperationType.ADDITION, 'Add', 10, 2);
    const subtractOperation = new Operation(2, OperationType.SUBTRACTION, 'Sub', 6, 2);

    const result: PaginatedResult<Record> = {
      data: [
        Record.createNewRecord(user, addOperation, '5'),
        Record.createNewRecord(user, subtractOperation, '-2'),
      ],
      total: 2,
    }

    jest
      .spyOn(operationRepository, 'findAll')
      .mockResolvedValue([addOperation, subtractOperation])

    jest
      .spyOn(userRepository, 'findByIdentityProviderId')
      .mockResolvedValue(user);

    jest
      .spyOn(recordRepository, 'searchActive')
      .mockResolvedValue(result);

    const response = await useCase.execute(input);
    expect(response.pagination).toEqual({
      page: input.pagination.page,
      pageSize: input.pagination.pageSize,
      pageTotal: 1,
      total: result.total,
    })
    expect(response.records.length).toEqual(2);
    expect(response.records).toEqual([
      {
        amount: result.data[0].getAmount(),
        date: result.data[0].getCreatedAt(),
        id: result.data[0].getId(),
        operationName: addOperation.getName(),
        operationResponse: result.data[0].getOperationResponse(),
        userBalance: result.data[0].getUserBalance(),
      },
      {
        amount: result.data[1].getAmount(),
        date: result.data[1].getCreatedAt(),
        id: result.data[1].getId(),
        operationName: subtractOperation.getName(),
        operationResponse: result.data[1].getOperationResponse(),
        userBalance: result.data[1].getUserBalance(),
      },
    ])
  })

});
