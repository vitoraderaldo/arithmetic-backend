import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OperationRepositoryInterface } from '../../../domain/calculator/repository/operation-repository.interface';
import { OperationModel } from './operation.model';
import { Operation } from '../../../domain/calculator/entity/operation';
import { OperationType } from '../../../domain/calculator/operation.types';

@Injectable()
export class OperationRepository implements OperationRepositoryInterface {
  constructor(
    @InjectRepository(OperationModel)
    private readonly repo: Repository<OperationModel>,
  ) {}

  async findByType(type: OperationType): Promise<Operation> {
    const operation = await this.repo.findOne({ where: {
      type
    }});
    if (!operation?.id) {
      return null;
    }
    return new Operation(operation.id, operation.type, operation.cost);
  }
  
}
