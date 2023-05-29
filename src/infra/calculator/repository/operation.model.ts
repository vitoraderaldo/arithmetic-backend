import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OperationType } from '../../../domain/calculator/operation.types';
import { ColumnNumericTransformer } from '../../typeorm/column-numeric.transformer';

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

  @Column('varchar', {
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column('decimal', {
    nullable: false,
    name: 'cost',
    transformer: new ColumnNumericTransformer(),
  })
  cost: number;

  @Column('tinyint', {
    nullable: false,
    name: 'inputs_required',
  })
  inputsRequired: number;

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
