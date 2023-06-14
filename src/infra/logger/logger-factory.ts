import { LoggerInterface } from '../../@shared/logger/logger.interface';
import { WinstonLogger } from './winston/winston-logger';

export class LoggerFactory {
  static create(): LoggerInterface {
    return new WinstonLogger();
  }
}
