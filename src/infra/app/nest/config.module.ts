import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestConfigService } from '../../environment/nest-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'src/infra/environment/dev.env',
    }),
  ],
  providers: [
    {
      provide: ConfigService,
      useFactory: () => new ConfigService(),
    },
    {
      provide: 'EnvironmentConfigInterface',
      useFactory: (configService: ConfigService) =>
        new NestConfigService(configService),
      inject: [ConfigService],
    },
  ],
  exports: ['EnvironmentConfigInterface'],
})
export class ConfModule {}
