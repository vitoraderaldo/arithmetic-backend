import { Module } from '@nestjs/common';
import { UserLogsInUseCase } from '../../../usecase/user/user-login.case';
import { UserController } from '../../user/routes/user.controller';
import { CognitoIdentityProviderService } from '../../user/repository/cognito-identity-provider';
import { IdentityProviderInterface } from '../../../domain/user/repository/identity-provider.interface';
import { EnvironmentConfigInterface } from '../../../@shared/environment/environment-config.interface';
import { CalculatorController } from '../../calculator/routes/calculator.controller';
import { CalculatorStrategy } from '../../../usecase/calculator/strategy/calculator-strategy';
import { CalculateUseCase } from '../../../usecase/calculator/calculate.usecase';
import { AdditionCalculator } from '../../../usecase/calculator/operations/addition-calculator';
import { ConfModule } from './config.module';
import { DatabaseModule } from './database.module';
import { UserRepository } from '../../user/repository/user.repository';
import { OperationRepository } from '../../calculator/repository/operation.repository';

@Module({
  imports: [ ConfModule, DatabaseModule ],
  controllers: [ UserController, CalculatorController],
  providers: [
    {
      provide: AdditionCalculator,
      useFactory: () => new AdditionCalculator(),
    },
    {
      provide: CalculatorStrategy,
      useFactory: (additionCalculator: AdditionCalculator) => new CalculatorStrategy(additionCalculator),
      inject: [AdditionCalculator],
    },
    {
      provide: CalculateUseCase,
      useFactory: (
        calculatorStrategy: CalculatorStrategy,
        userRepository: UserRepository,
        operationRepository: OperationRepository,
      ) => new CalculateUseCase(calculatorStrategy, userRepository, operationRepository),
      inject: [CalculatorStrategy, UserRepository, OperationRepository],
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
