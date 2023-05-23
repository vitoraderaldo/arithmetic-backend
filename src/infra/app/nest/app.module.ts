import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserLogsInUseCase } from '../../../usecase/user/user-login.case';
import { UserController } from '../../user/routes/user.controller';
import { CognitoIdentityProviderService } from '../../user/repository/cognito-identity-provider';
import { IdentityProviderInterface } from '../../../domain/user/repository/identity-provider.interface';
import { NestConfigService } from '../../environment/nest-config.service';
import { EnvironmentConfigInterface } from '../../../@shared/environment/environment-config.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `src/infra/environment/dev.env`,
    }),
  ],
  controllers: [ UserController],
  providers: [
    {
      provide: ConfigService,
      useFactory: () => new ConfigService(),
      inject: [],
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
