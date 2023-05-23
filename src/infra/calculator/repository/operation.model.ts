import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OperationType } from '../../../domain/calculator/operation.types';

@Entity('operation')
export class OperationModel {
  @PrimaryGeneratedColumn({
    type: 'tinyint',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'type',
  })
  type: OperationType;

  @Column('decimal', {
    nullable: false,
    name: 'cost',
  })
  cost: number;

  @Column('timestamp', {
    nullable: false,
    name: 'date_created',
    default: () => 'current_timestamp',
  })
  dateCreated: Date;

  @Column('timestamp', {
    nullable: false,
    default: () => 'current_timestamp',
    name: 'date_modified',
  })
  dateModified: Date;

}
