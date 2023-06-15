import { LoggerService } from '@nestjs/common';
import { LoggerInterface } from '../../../@shared/logger/logger.interface';
import { LoggerFactory } from '../logger-factory';

export class NestJsLoggerAdapter implements LoggerService {
  private readonly logger: LoggerInterface;

  constructor() {
    this.logger = LoggerFactory.create();
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.log('info', message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.logger.error(message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, optionalParams);
  }
}
