import { createLogger, format, transports } from 'winston';
import apm from 'elastic-apm-node';

export const winstonLogger = createLogger({
  level: 'debug',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
    format((info) => {
      if (apm?.isStarted && apm?.currentTransaction) {
        return {
          ...info,
          trace: {
            id: apm.currentTransaction.ids['trace.id'],
          },
          transaction: {
            id: apm.currentTransaction.ids['transaction.id'],
          },
        };
      }
      return info;
    })(),

    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    new transports.File({ filename: '.logs/arithmetic-calculator.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  winstonLogger.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}
