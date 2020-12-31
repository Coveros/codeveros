import * as winston from 'winston';
import { Logger, LoggerOptions } from 'winston';

const defaultOptions: winston.LoggerOptions = {
  format: winston.format.combine(
    winston.format.timestamp({ format: 'DD/MMM/YYYY:HH:mm:ss ZZ' }),
    winston.format.align(),
    winston.format.printf((info) => `${info.level}: [${info.timestamp}] - ${info.message}`),
  ),
  level: process.env.LOG_LEVEL || 'info',
  transports: [new winston.transports.Console()],
};

export function getLogger(name = 'default', options: LoggerOptions = {}): Logger {
  return winston.loggers.get(name, { ...defaultOptions, ...options });
}
