import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { ConfModule } from './config.module';
import { EnvironmentConfigInterface } from '../../../@shared/environment/environment-config.interface';
import { startApmAgent } from '../elastic-apm/elastic-apm';
import { LoggerInterface } from '../../../@shared/logger/logger.interface';

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
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const logger = app.get<LoggerInterface>('LoggerInterface');
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  app.enableCors();
  await app.listen(7001);
};
