import { RecordRepositoryInterface } from "../../domain/record/repository/record-repository.interface";
import { SearchRecordOutput, SearchRecordsInputDto, SearchRecordsOutputDto } from "./dto/search-records.dto";
import { Record } from '../../domain/record/entity/record'
import { UserRepositoryInterface } from "../../domain/user/repository/user-repository.interface";

export class SearchRecordsUseCase {

  constructor(
    private readonly recordRepository: RecordRepositoryInterface,
    private readonly userRepository: UserRepositoryInterface,
  ) {}

  public async execute(input: SearchRecordsInputDto): Promise<SearchRecordsOutputDto> {
    const { filter, pagination } = input;
    const user = await this.userRepository.findByIdentityProviderId(filter.identityProviderId);
    const paginatedResult = await this.recordRepository.search({
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
        field: 'dateCreated',
        order: 'DESC',
      }
    });
    
    return {
      records: paginatedResult.data.map(this.mapRecordEntityToOutputDto),
      pagination: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        pageTotal: Math.ceil(paginatedResult.total / pagination.pageSize),
        total: paginatedResult.total,
      }
    }
  }

  private mapRecordEntityToOutputDto(record: Record): SearchRecordOutput {
    return {
      id: record.getId(),
      operationName: record.getOperationId().toString(),
      amount: record.getAmount(),
      userBalance: record.getUserBalance(),
      operationResponse: record.getOperationResponse(),
      date: record.getCreatedAt(),
    }
  }
 
}
