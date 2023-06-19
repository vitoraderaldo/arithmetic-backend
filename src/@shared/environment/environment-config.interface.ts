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

export interface KafkaConfig {
  brokers: string[];
  clientId: string;
  credentials: {
    username: string;
    password: string;
  };
}

export interface ElasticApmConfig {
  enabled: boolean;
  apiKey: string;
  serverUrl: string;
  environment: string;
}

export interface EnvironmentConfigInterface {
  getCognito(): CognitoEnvConfig;
  getDatabase(): DatabaseConfig;
  getKafka(): KafkaConfig;
  getElasticApm(): ElasticApmConfig;
}
