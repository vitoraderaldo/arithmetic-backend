import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserLogsInUseCase } from '../../../usecase/user/user-login.case';
import { UserController } from '../../user/routes/user.controller';
import { CognitoIdentityProviderService } from '../../user/repository/cognito-identity-provider';
import { IdentityProviderInterface } from '../../../domain/user/repository/identity-provider.interface';
import { NestConfigService } from '../../environment/nest-config.service';
import { EnvironmentConfigInterface } from '../../../@shared/environment/environment-config.interface';
import { CalculatorController } from '../../calculator/routes/calculator.controller';
import { CalculatorStrategy } from '../../../usecase/calculator/strategy/calculator-strategy';
import { CalculateUseCase } from '../../../usecase/calculator/calculate.usecase';
import { AdditionCalculator } from '../../../usecase/calculator/operations/addition-calculator';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `src/infra/environment/dev.env`,
    }),
  ],
  controllers: [ UserController, CalculatorController],
  providers: [
    {
      provide: ConfigService,
      useFactory: () => new ConfigService(),
    },
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
      useFactory: (calculatorStrategy: CalculatorStrategy) => new CalculateUseCase(calculatorStrategy),
      inject: [CalculatorStrategy],
    },
    {
      provide: 'EnvironmentConfigInterface',
      useFactory: (configService: ConfigService) => new NestConfigService(configService),
      inject: [ConfigService],
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
