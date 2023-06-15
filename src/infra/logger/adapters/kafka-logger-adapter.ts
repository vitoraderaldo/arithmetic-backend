import { LoggerFactory } from '../logger-factory';
import { logLevel as KafkaLogLevel } from 'kafkajs';

const logLevelConverter = (level: KafkaLogLevel): string => {
  switch (level) {
    case KafkaLogLevel.ERROR:
    case KafkaLogLevel.NOTHING:
      return 'error';
    case KafkaLogLevel.WARN:
      return 'warn';
    case KafkaLogLevel.INFO:
      return 'info';
    case KafkaLogLevel.DEBUG:
      return 'debug';
  }
};

export const KafkaLogAdapter = () => {
  const logger = LoggerFactory.create();
  return ({ level, log }) => {
    const { message, ...extra } = log;
    logger.log(logLevelConverter(level), message, extra);
  };
};
