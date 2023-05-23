export interface CognitoEnvConfig {
  region: string;
  clientId: string;
}

export interface EnvironmentConfigInterface {
  getCognito(): CognitoEnvConfig;
}
