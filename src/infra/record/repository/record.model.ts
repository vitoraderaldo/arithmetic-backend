import { Column, Entity, PrimaryColumn } from 'typeorm';
import { ColumnNumericTransformer } from '../../typeorm/column-numeric.transformer';

@Entity('record')
export class RecordModel {
  @PrimaryColumn({
    type: 'varchar',
    name: 'id',
  })
  id: string;

  @Column('tinyint', {
    nullable: false,
    name: 'operation_id',
  })
  operationId: number;

  @Column('int', {
    nullable: false,
    name: 'user_id',
  })
  userId: number;

  @Column('decimal', {
    nullable: false,
    name: 'amount',
    transformer: new ColumnNumericTransformer(),
  })
  amount: number;

  @Column('decimal', {
    nullable: false,
    name: 'user_balance',
    transformer: new ColumnNumericTransformer(),
  })
  userBalance: number;

  @Column('varchar', {
    nullable: false,
    name: 'operation_response',
  })
  operationResponse: string;

  @Column('tinyint', {
    nullable: false,
    name: 'deleted',
    default: false,
  })
  deleted: boolean;

  @Column('timestamp', {
    nullable: false,
    name: 'date_created',
    default: () => 'current_timestamp',
  })
  dateCreated: Date;
}
