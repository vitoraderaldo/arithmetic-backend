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

@Module({
  imports: [ ConfModule, DatabaseModule ],
  controllers: [ UserController, CalculatorController],
  providers: [
    {
      provide: 'CalculatorInterface',
      useFactory: () => new Calculator(),
    },
    {
      provide: CalculatorStrategy,
      useFactory: (calculator: CalculatorInterface) => new CalculatorStrategy(calculator),
      inject: ['CalculatorInterface'],
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
  ],
})

export class AppModule {}
