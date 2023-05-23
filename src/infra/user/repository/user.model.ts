import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserModel {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column('varchar', {
    nullable: false,
    name: 'email',
  })
  email: string;

  @Column('tinyint', {
    nullable: false,
    name: 'status_id',
  })
  statusId: number;

  @Column('decimal', {
    nullable: false,
    name: 'current_balance',
  })
  currentBalance: number;

  @Column('varchar', {
    nullable: false,
    name: 'identity_provider_id',
  })
  identityProviderId: string;

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
