import { RecordRepositoryInterface } from '../../domain/record/repository/record-repository.interface';
import {
  SearchRecordsInputDto,
  SearchRecordsOutputDto,
} from './dto/search-records.dto';
import { Record } from '../../domain/record/entity/record';
import { UserRepositoryInterface } from '../../domain/user/repository/user-repository.interface';
import { PaginatedResult } from '../../@shared/database/paginated-result';
import { OperationRepositoryInterface } from '../../domain/calculator/repository/operation-repository.interface';
import { Operation } from '../../domain/calculator/entity/operation';
import { DateFilterError } from '../../@shared/error/date-filter.error';

export class SearchRecordsUseCase {
  constructor(
    private readonly recordRepository: RecordRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface,
    private readonly operationRepository: OperationRepositoryInterface,
  ) {}

  public async execute(
    input: SearchRecordsInputDto,
  ): Promise<SearchRecordsOutputDto> {
    const { filter, pagination, sort } = input;
    if (filter.startDate.getTime() > filter.endDate.getTime()) {
      throw new DateFilterError('Start date must be before end date');
    }
    const user = await this.userRepository.findByIdentityProviderId(
      filter.identityProviderId,
    );
    const paginatedResult = await this.recordRepository.searchActive({
      filter: {
        operationId: filter.operationId || undefined,
        startDate: filter.startDate,
        endDate: filter.endDate,
        userId: user.getId(),
      },
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
      },
      sort: {
        field: sort.field || 'dateCreated',
        order: sort.order || 'desc',
      },
    });

    const recordsOutput = await this.mapPaginatedResultToOutputDto(
      paginatedResult,
    );

    return {
      records: recordsOutput,
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        pageTotal: Math.ceil(paginatedResult.total / pagination.pageSize),
        total: paginatedResult.total,
      },
    };
  }

  private async mapPaginatedResultToOutputDto(
    paginatedResult: PaginatedResult<Record>,
  ) {
    const operations = await this.getOperations();
    return paginatedResult.data.map((record) => {
      return {
        id: record.getId(),
        operationName: operations.get(record.getOperationId()).getName(),
        amount: record.getAmount(),
        userBalance: record.getUserBalance(),
        operationResponse: record.getOperationResponse(),
        date: record.getCreatedAt(),
      };
    });
  }

  private async getOperations(): Promise<Map<number, Operation>> {
    const operations = await this.operationRepository.findAll();
    return new Map(
      operations.map((operation) => [operation.getId(), operation]),
    );
  }
}
