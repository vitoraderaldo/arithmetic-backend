import { ConfigService } from '@nestjs/config';
import {
  CognitoEnvConfig,
  DatabaseConfig,
  ElasticApmConfig,
  EnvironmentConfigInterface,
  KafkaConfig,
} from '../../@shared/environment/environment-config.interface';

export class NestConfigService implements EnvironmentConfigInterface {
  constructor(private readonly nestConfig: ConfigService) {}

  getCognito(): CognitoEnvConfig {
    return {
      region: this.nestConfig.get('COGNITO_REGION'),
      clientId: this.nestConfig.get('COGNITO_CLIENT_ID'),
      userPoolId: this.nestConfig.get('COGNITO_USER_POOL_ID'),
    };
  }

  getDatabase(): DatabaseConfig {
    return {
      host: this.nestConfig.get('DATABASE_HOST'),
      port: this.nestConfig.get('DATABASE_PORT'),
      username: this.nestConfig.get('DATABASE_USERNAME'),
      password: this.nestConfig.get('DATABASE_PASSWORD'),
      database: this.nestConfig.get('DATABASE_NAME'),
    };
  }

  getKafka(): KafkaConfig {
    return {
      brokers: this.nestConfig.get('KAFKA_BROKERS')?.split(','),
      clientId: this.nestConfig.get('KAFKA_CLIENT_ID'),
      credentials: {
        username: this.nestConfig.get('KAFKA_USERNAME'),
        password: this.nestConfig.get('KAFKA_PASSWORD'),
      },
    };
  }

  getElasticApm(): ElasticApmConfig {
    return {
      enabled:
        this.nestConfig.get<string>('ELASTIC_APM_ENABLED')?.toLowerCase() ===
        'true',
      secretToken: this.nestConfig.get('ELASTIC_APM_SECRET_TOKEN'),
      apiKey: this.nestConfig.get('ELASTIC_APM_API_KEY'),
      serverUrl: this.nestConfig.get('ELASTIC_APM_SERVER_URL'),
      environment: this.nestConfig.get('ENV'),
    };
  }
}
