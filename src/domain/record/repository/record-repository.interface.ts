import { PaginatedResult } from '../../../@shared/interface/paginated-result'
import { Record } from '../entity/record'
import { RecordSearchRepositoryDto } from './repository.dto'

export interface RecordRepositoryInterface {
  create(record: Record): Promise<void>
  search(params: RecordSearchRepositoryDto): Promise<PaginatedResult<Record>>
}
