import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';
import { ConfModule } from './config.module';
import { EnvironmentConfigInterface } from '../../../@shared/environment/environment-config.interface';
import { UserModel } from '../../user/repository/user.model';
import { UserRepository } from '../../user/repository/user.repository';
import { OperationModel } from '../../calculator/repository/operation.model';
import { OperationRepository } from '../../calculator/repository/operation.repository';
import { RecordModel } from '../../record/repository/record.model';
import { RecordRepository } from '../../record/repository/record-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserModel, OperationModel, RecordModel]),
    TypeOrmModule.forRootAsync({
      imports: [ConfModule],
      useFactory: (environmentConfigInterface: EnvironmentConfigInterface) => {
        const database = environmentConfigInterface.getDatabase();
        return {
          host: database.host,
          port: database.port,
          username: database.username,
          password: database.password,
          database: database.database,
          ssl: {
            rejectUnauthorized: database.rejectUnauthorized,
          },
          type: 'mysql',
          autoLoadEntities: true,
          synchronize: false,
          timezone: '+00:00',
        };
      },
      async dataSourceFactory(options) {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      },
      inject: ['EnvironmentConfigInterface'],
    }),
  ],
  providers: [UserRepository, OperationRepository, RecordRepository],
  exports: [UserRepository, OperationRepository, RecordRepository],
})
export class DatabaseModule {}
