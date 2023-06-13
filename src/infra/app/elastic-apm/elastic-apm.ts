import apm from 'elastic-apm-node';
import { ElasticApmConfig } from '../../../@shared/environment/environment-config.interface';

export const startApmAgent = (config: ElasticApmConfig) => {
  try {
    apm.start({
      active: config.enabled,
      serviceName: 'calculator',
      serverUrl: config.serverUrl,
      serviceVersion: '',
      environment: config.environment,
      useElasticTraceparentHeader: true,
    });
    console.log('Elastic APM agent started successfully');
  } catch (err) {
    console.error('Failed to start Elastic APM agent', err);
  }
};
