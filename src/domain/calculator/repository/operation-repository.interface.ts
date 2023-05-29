import { Operation } from '../entity/operation';
import { OperationType } from '../operation.types';

export interface OperationRepositoryInterface {
  findByType(type: OperationType): Promise<Operation>;
  findAll(): Promise<Operation[]>;
}
