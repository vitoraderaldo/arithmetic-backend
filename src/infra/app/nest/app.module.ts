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
import { HtppClient } from '../../../@shared/http-client/http-client.interface';
import { DeleteRecordUseCase } from '../../../usecase/record/delete-record.usecase';
import { EventDispatcherFactory } from '../../event/event-dispatcher.factory';
import { EventDispatcherInterface } from 'arithmetic-packages';
import { KafkaJSClient } from '../../event/kafkajs-client';
import { KafkaPublisherHandler } from '../../event/kafka-publisher.handler';
import { KafkaClient } from '../../event/kafka-client.interface';
import { LoggerFactory } from '../../logger/logger-factory';
import { LoggerInterface } from '../../../@shared/logger/logger.interface';
import { PrometheusController } from '../../prometheus/routes/prometheus.controller';
import { GetRecordMetricsUseCase } from '../../../usecase/record/get-record-metrics.usecase';
import { RecordRepositoryInterface } from '../../../domain/record/repository/record-repository.interface';
import { PromClientFactory } from '../../prometheus/services/prom-client.factory';
import { RecordsMetricsPresenter } from '../../prometheus/routes/presenters/records-metrics.presenter';
import { PromClientInterface } from '../../prometheus/interfaces/metrics/prom-client.interface';
import { GetNodeJsMetricsUseCase } from '../../../usecase/technical-metrics/get-nodejs-metrics.usecase';

@Module({
  imports: [ConfModule, DatabaseModule],
  controllers: [
    UserController,
    CalculatorController,
    HealthCheckController,
    RecordsController,
    PrometheusController,
  ],
  providers: [
    {
      provide: 'LoggerInterface',
      useFactory: () => LoggerFactory.create(),
      inject: [],
    },
    {
      provide: 'PromClientInterface',
      useFactory: () => PromClientFactory.create(),
      inject: [],
    },
    {
      provide: RecordsMetricsPresenter,
      useFactory: (promClient: PromClientInterface) =>
        new RecordsMetricsPresenter(promClient),
      inject: ['PromClientInterface'],
    },
    {
      provide: GetNodeJsMetricsUseCase,
      useFactory: (promClient: PromClientInterface) =>
        new GetNodeJsMetricsUseCase(promClient),
      inject: ['PromClientInterface'],
    },
    {
      provide: 'RecordRepositoryInterface',
      useFactory: (recordRepository: RecordRepository) => recordRepository,
      inject: [RecordRepository],
    },
    {
      provide: KafkaJSClient,
      useFactory: (environmentConfig: EnvironmentConfigInterface) => {
        const kafkaConfig = environmentConfig.getKafka();
        return new KafkaJSClient(
          kafkaConfig.clientId,
          kafkaConfig.brokers,
          kafkaConfig.credentials,
        );
      },
      inject: ['EnvironmentConfigInterface'],
    },
    {
      provide: 'KafkaClient',
      useFactory: (kafkaJSClient: KafkaJSClient) => kafkaJSClient,
      inject: [KafkaJSClient],
    },
    {
      provide: KafkaPublisherHandler,
      useFactory: (kafkaClient: KafkaClient) =>
        new KafkaPublisherHandler(kafkaClient),
      inject: ['KafkaClient'],
    },
    {
      provide: EventDispatcherFactory,
      useFactory: (kafkaPublisherHandler: KafkaPublisherHandler) =>
        new EventDispatcherFactory(kafkaPublisherHandler),
      inject: [KafkaPublisherHandler],
    },
    {
      provide: 'EventDispatcherInterface',
      useFactory: (eventDispatcherFactory: EventDispatcherFactory) =>
        eventDispatcherFactory.create(),
      inject: [EventDispatcherFactory],
    },
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
      useFactory: (randomStringInterface: RandomStringInterface) =>
        new RandomStringService(randomStringInterface),
      inject: ['RandomStringInterface'],
    },
    {
      provide: CalculatorStrategy,
      useFactory: (
        calculator: CalculatorInterface,
        randomStringService: RandomStringService,
      ) => new CalculatorStrategy(calculator, randomStringService),
      inject: ['CalculatorInterface', RandomStringService],
    },
    {
      provide: FindOperationsUseCase,
      useFactory: (operationRepository: OperationRepository) =>
        new FindOperationsUseCase(operationRepository),
      inject: [OperationRepository],
    },
    {
      provide: CalculateUseCase,
      useFactory: (
        calculatorStrategy: CalculatorStrategy,
        userRepository: UserRepository,
        operationRepository: OperationRepository,
        recordRepository: RecordRepositoryInterface,
        eventDispatcher: EventDispatcherInterface,
        logger: LoggerInterface,
      ) =>
        new CalculateUseCase(
          calculatorStrategy,
          userRepository,
          operationRepository,
          recordRepository,
          eventDispatcher,
          logger,
        ),
      inject: [
        CalculatorStrategy,
        UserRepository,
        OperationRepository,
        'RecordRepositoryInterface',
        'EventDispatcherInterface',
        'LoggerInterface',
      ],
    },
    {
      provide: 'IdentityProviderInterface',
      useFactory: (environmentConfigInterface: EnvironmentConfigInterface) =>
        new CognitoIdentityProviderService(environmentConfigInterface),
      inject: ['EnvironmentConfigInterface'],
    },
    {
      provide: UserLogsInUseCase,
      useFactory: (
        identityProviderInterface: IdentityProviderInterface,
        userRepository: UserRepository,
      ) => new UserLogsInUseCase(identityProviderInterface, userRepository),
      inject: ['IdentityProviderInterface', UserRepository],
    },
    {
      provide: SearchRecordsUseCase,
      useFactory: (
        recordRepository: RecordRepositoryInterface,
        userRepository: UserRepository,
        operationRepository: OperationRepository,
      ) =>
        new SearchRecordsUseCase(
          recordRepository,
          userRepository,
          operationRepository,
        ),
      inject: [
        'RecordRepositoryInterface',
        UserRepository,
        OperationRepository,
      ],
    },
    {
      provide: DeleteRecordUseCase,
      useFactory: (
        recordRepository: RecordRepositoryInterface,
        userRepository: UserRepository,
      ) => new DeleteRecordUseCase(recordRepository, userRepository),
      inject: ['RecordRepositoryInterface', UserRepository],
    },
    {
      provide: GetRecordMetricsUseCase,
      useFactory: (recordRepository: RecordRepositoryInterface) =>
        new GetRecordMetricsUseCase(recordRepository),
      inject: ['RecordRepositoryInterface'],
    },
  ],
})
export class AppModule {}
