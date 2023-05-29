import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { RecordRepositoryInterface } from '../../../domain/record/repository/record-repository.interface';
import { RecordModel } from './record.model';
import { Record } from '../../../domain/record/entity/record';
import { PaginatedResult } from '../../../@shared/interface/paginated-result';
import { RecordSearchRepositoryDto } from '../../../domain/record/repository/repository.dto';
import { RecordNotFound } from '../../../domain/record/error/record-not-found';

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
      deleted: record.isDeleted(),
      dateCreated: record.getCreatedAt(),
    };
    await this.repo.save(model);
  }

  async findById(id: string): Promise<Record> {
    const model = await this.repo.findOne({ where: { id } });
    if (!model) {
      throw new RecordNotFound(`Record not found with id ${id}`);
    }
    return this.mapRecordModelToEntity(model);
  }

  async deleteById(id: string): Promise<void> {
    await this.repo.update({ id }, { deleted: true });
  }

  async searchActive(
    params: RecordSearchRepositoryDto,
  ): Promise<PaginatedResult<Record>> {
    const [data, total] = await this.repo.findAndCount({
      where: {
        operationId: params.filter.operationId,
        userId: params.filter.userId,
        dateCreated: Between(params.filter.startDate, params.filter.endDate),
        deleted: false,
      },
      skip: (params.pagination.page - 1) * params.pagination.pageSize,
      take: params.pagination.pageSize,
      order: {
        [params.sort.field]: params.sort.order,
      },
    });
    return {
      data: data.map(this.mapRecordModelToEntity),
      total,
    };
  }

  private mapRecordModelToEntity(model: RecordModel): Record {
    return Record.createFromExistingRecord(
      model.id,
      model.operationId,
      model.userId,
      model.amount,
      model.userBalance,
      model.operationResponse,
      model.deleted,
      model.dateCreated,
    );
  }
}
