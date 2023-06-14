export interface LoggerInterface {
  error(msg: string, metadata?: object): LoggerInterface;
  warn(msg: string, metadata?: object): LoggerInterface;
  info(msg: string, metadata?: object): LoggerInterface;
  debug(msg: string, metadata?: object): LoggerInterface;
}
