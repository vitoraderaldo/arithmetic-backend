import { PaginatedResult } from '../../../@shared/database/paginated-result';
import { Record } from '../entity/record';
import { RecordMetrics, RecordSearchRepositoryDto } from './repository.dto';

export interface RecordRepositoryInterface {
  create(record: Record): Promise<void>;

  searchActive(
    params: RecordSearchRepositoryDto,
  ): Promise<PaginatedResult<Record>>;

  findById(id: string): Promise<Record>;

  deleteById(id: string): Promise<void>;

  getMetrics(): Promise<RecordMetrics[]>;
}
