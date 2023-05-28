import { Module } from '@nestjs/common';
import { UserLogsInUseCase } from '../../../usecase/user/user-login.case';
import { UserController } from '../../user/routes/user.controller';
import { CognitoIdentityProviderService } from '../../user/repository/cognito-identity-provider';
import { IdentityProviderInterface } from '../../../domain/user/repository/identity-provider.interface';
import { EnvironmentConfigInterface } from '../../../@shared/environment/environment-config.interface';
import { CalculatorController } from '../../calculator/routes/calculator.controller';
import { CalculatorStrategy } from '../../../usecase/calculator/strategy/calculator-strategy';
import { CalculateUseCase } from '../../../usecase/calculator/calculate.usecase';
import { ConfModule } from './config.module';
import { DatabaseModule } from './database.module';
import { UserRepository } from '../../user/repository/user.repository';
import { OperationRepository } from '../../calculator/repository/operation.repository';
import { RecordRepository } from '../../record/repository/record-repository';
import { FindOperationsUseCase } from '../../../usecase/calculator/find-operations.usecase';
import { Calculator } from '../../../usecase/calculator/operations/calculator';
import { CalculatorInterface } from '../../../usecase/calculator/strategy/calculator.interface';
import { HealthCheckController } from '../../user/routes/health-check.controller';
import { SearchRecordsUseCase } from '../../../usecase/record/serch-records.usecase';
import { RecordsController } from '../../record/routes/records.controller';
import { RandomStringInterface } from '../../../usecase/calculator/strategy/random-string.interface';
import { RandomStringOrg } from '../../../usecase/calculator/operations/random-string-org';
import { RandomStringService } from '../../../usecase/calculator/operations/random-string.service';
import { AxiosService } from '../../http-client/axios.service';
import { HtppClient } from '../../../@shared/interface/http-client.interface';
import { DeleteRecordUseCase } from '../../../usecase/record/delete-record.usecase';

@Module({
  imports: [ ConfModule, DatabaseModule ],
  controllers: [ UserController, CalculatorController, HealthCheckController, RecordsController],
  providers: [
    {
      provide: 'CalculatorInterface',
      useFactory: () => new Calculator(),
    },
    {
      provide: 'HtppClient',
      useFactory: () => new AxiosService(),
    },
    {
      provide: 'RandomStringInterface',
      useFactory: (htppClient: HtppClient) => new RandomStringOrg(htppClient),
      inject: ['HtppClient'],
    },
    {
      provide: RandomStringService,
      useFactory: (randomStringInterface: RandomStringInterface) => new RandomStringService(randomStringInterface),
      inject: ['RandomStringInterface'],
    },
    {
      provide: CalculatorStrategy,
      useFactory: (calculator: CalculatorInterface, randomStringService: RandomStringService) => new CalculatorStrategy(calculator, randomStringService),
      inject: ['CalculatorInterface', RandomStringService],
    },
    {
      provide: FindOperationsUseCase,
      useFactory: (operationRepository: OperationRepository)  => new FindOperationsUseCase(operationRepository),
      inject: [OperationRepository],
    },
    {
      provide: CalculateUseCase,
      useFactory: (
        calculatorStrategy: CalculatorStrategy,
        userRepository: UserRepository,
        operationRepository: OperationRepository,
        recordRepository: RecordRepository,
      ) => new CalculateUseCase(calculatorStrategy, userRepository, operationRepository, recordRepository),
      inject: [CalculatorStrategy, UserRepository, OperationRepository, RecordRepository],
    },
    {
      provide: 'IdentityProviderInterface',
      useFactory: (environmentConfigInterface: EnvironmentConfigInterface) => new CognitoIdentityProviderService(environmentConfigInterface),
      inject: ['EnvironmentConfigInterface'],
    },
    {
      provide: UserLogsInUseCase,
      useFactory: (identityProviderInterface: IdentityProviderInterface) =>
        new UserLogsInUseCase(identityProviderInterface),
      inject: ['IdentityProviderInterface'],
    },
    {
      provide: SearchRecordsUseCase,
      useFactory: (recordRepository: RecordRepository, userRepository: UserRepository, operationRepository: OperationRepository) =>
        new SearchRecordsUseCase(recordRepository, userRepository, operationRepository),
      inject: [RecordRepository, UserRepository, OperationRepository],
    },
    {
      provide: DeleteRecordUseCase,
      useFactory: (recordRepository: RecordRepository, userRepository: UserRepository) =>
        new DeleteRecordUseCase(recordRepository, userRepository),
      inject: [RecordRepository, UserRepository],
    },
  ],
})

export class AppModule {}
