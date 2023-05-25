export interface CognitoEnvConfig {
  region: string;
  clientId: string;
  userPoolId: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface EnvironmentConfigInterface {
  getCognito(): CognitoEnvConfig;
  getDatabase(): DatabaseConfig;
}
