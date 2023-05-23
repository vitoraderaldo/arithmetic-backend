import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfModule } from './config.module';
import { EnvironmentConfigInterface } from '../../../@shared/environment/environment-config.interface';
import { UserModel } from '../../user/repository/user.model';
import { UserRepository } from '../../user/repository/user.repository';
import { OperationModel } from '../../calculator/repository/operation.model';
import { OperationRepository } from '../../calculator/repository/operation.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserModel,
      OperationModel,
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfModule],
      useFactory: (environmentConfigInterface: EnvironmentConfigInterface) => {
        const database = environmentConfigInterface.getDatabase();
        return {
          ...database,
          type: 'mysql',
          autoLoadEntities: true,
          synchronize: false,
        };
      },
      inject: ['EnvironmentConfigInterface'],
    }),
  ],
  providers: [ UserRepository, OperationRepository ],
  exports: [ UserRepository, OperationRepository ],
})
export class DatabaseModule {}
