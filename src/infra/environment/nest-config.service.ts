import { ConfigService } from '@nestjs/config';
import {
  CognitoEnvConfig,
  DatabaseConfig,
  EnvironmentConfigInterface,
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
}
