import apm from 'elastic-apm-node';
import { ElasticApmConfig } from '../../../@shared/environment/environment-config.interface';
import { LoggerFactory } from '../../logger/logger-factory';
import { ElasticApmLoggerAdapter } from '../../logger/adapters/elastic-apm-logger-adapter';

const logger = LoggerFactory.create();

export const startApmAgent = (config: ElasticApmConfig) => {
  try {
    apm.start({
      active: config.enabled,
      serviceName: 'calculator',
      serverUrl: config.serverUrl,
      serviceVersion: '',
      environment: config.environment,
      apiKey: config.apiKey,
      useElasticTraceparentHeader: true,
      logger: new ElasticApmLoggerAdapter(),
      logLevel: 'error',
    });
    logger.info('Elastic APM agent started successfully');
  } catch (err) {
    logger.error('Failed to start Elastic APM agent', err);
  }
};
