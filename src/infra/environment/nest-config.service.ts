import { ConfigService } from "@nestjs/config";
import { CognitoEnvConfig, EnvironmentConfigInterface } from "../../@shared/environment/environment-config.interface";

export class NestConfigService implements EnvironmentConfigInterface {

  constructor(private readonly nestConfig: ConfigService) {}
  
  getCognito(): CognitoEnvConfig {
    return {
      region: this.nestConfig.get('COGNITO_REGION'),
      clientId: this.nestConfig.get('COGNITO_CLIENT_ID'),
    }
  }
  
}
