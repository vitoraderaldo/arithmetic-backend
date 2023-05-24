import { Record } from '../entity/record'

export interface RecordRepositoryInterface {
  create(record: Record): Promise<void>
}
