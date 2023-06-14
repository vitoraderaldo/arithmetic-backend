import winston from 'winston';
import { LoggerInterface } from '../../../@shared/logger/logger.interface';
import { winstonLogger } from './winston-config';

export class WinstonLogger implements LoggerInterface {
  private logger: winston.Logger;

  constructor() {
    this.logger = winstonLogger;
  }

  error(msg: string, metadata: object): LoggerInterface {
    this.logger.error(msg, metadata);
    return this;
  }

  warn(msg: string, metadata: object): LoggerInterface {
    this.logger.warn(msg, metadata);
    return this;
  }

  info(msg: string, metadata: object): LoggerInterface {
    this.logger.info(msg, metadata);
    return this;
  }

  debug(obj: string, metadata: object): LoggerInterface {
    this.logger.debug(obj, metadata);
    return this;
  }
}
