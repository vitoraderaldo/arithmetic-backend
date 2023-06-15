import { Logger } from 'elastic-apm-node';
import { LoggerFactory } from '../logger-factory';

export class ElasticApmLoggerAdapter implements Logger {
  constructor(private readonly logger = LoggerFactory.create()) {}

  fatal(obj: any, msg: any, args: any): void {
    this.log('error', obj, msg, args);
  }

  error(obj: any, msg: any, args: any): void {
    this.log('error', obj, msg, args);
  }

  warn(obj: any, msg: any, args: any): void {
    this.log('warn', obj, msg, args);
  }

  info(obj: any, msg: any, args: any): void {
    this.log('info', obj, msg, args);
  }

  debug(obj: any, msg: any, args: any): void {
    this.log('debug', obj, msg, args);
  }

  trace(obj: any, msg: any, args: any): void {
    this.log('debug', obj, msg, args);
  }

  private log(level: string, obj: any, msg: any, args: any) {
    if (typeof obj === 'string') {
      this.logger.log(level, obj, msg);
    } else {
      this.logger.log(level, JSON.stringify(obj), args);
    }
  }
}
