import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { ConfModule } from './config.module';
import { EnvironmentConfigInterface } from '../../../@shared/environment/environment-config.interface';
import { startApmAgent } from '../elastic-apm/elastic-apm';
import { LoggerInterface } from '../../../@shared/logger/logger.interface';
import { NestJsLoggerAdapter } from '../../logger/adapters/nestjs-logger-adapter';
import { RequestTimeInterceptor } from './interceptors/request-timing.interceptor';

export const bootstrap = async (): Promise<void> => {
  // Apm
  const confModule = await NestFactory.createApplicationContext(ConfModule);
  const configService = confModule.get<EnvironmentConfigInterface>(
    'EnvironmentConfigInterface',
  );
  startApmAgent(configService.getElasticApm());
  confModule.close();

  // TypeORM Transactions
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule);
  const logger = app.get<LoggerInterface>('LoggerInterface');
  const requestTimeInterceptor = app.get(RequestTimeInterceptor);

  app.useLogger(new NestJsLoggerAdapter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(requestTimeInterceptor);

  app.useGlobalFilters(new AllExceptionsFilter(logger));
  app.enableCors();
  await app.listen(7001);
};
