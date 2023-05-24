import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecordRepositoryInterface } from '../../../domain/record/repository/record-repository.interface';
import { RecordModel } from './record.model';
import { Record } from '../../../domain/record/entity/record';

@Injectable()
export class RecordRepository implements RecordRepositoryInterface {
  constructor(
    @InjectRepository(RecordModel)
    private readonly repo: Repository<RecordModel>,
  ) {}

  async create(record: Record): Promise<void> {
    const model: RecordModel = {
      id: record.getId(),
      operationId: record.getOperationId(),
      userId: record.getUserId(),
      amount: record.getAmount(),
      userBalance: record.getUserBalance(),
      operationResponse: record.getOperationResponse(),
      dateCreated: record.getCreatedAt(),
    }
    await this.repo.save(model);
  }

}
