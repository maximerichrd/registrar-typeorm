import { transports, format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const getConsoleTransportConfig = () => {
  if (process.env['NODE_ENV'] === 'production') {
    return {
      format: format.simple(),
    };
  }

  return {
    level: 'silly',
    format: format.combine(
      format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      format.colorize({
        colors: {
          info: 'blue',
          warn: 'yellow',
          error: 'red',
        },
      }),
      format.printf((info) => {
        return `[${info.level}] ${info.message}`;
      }),
      format.align()
    ),
  };
};

const winstonTransports = {
  console: new transports.Console(getConsoleTransportConfig()),
  combinedFile: new DailyRotateFile({
    dirname: 'logs',
    filename: 'combined',
    extension: '.log',
    level: 'info',
  }),
  errorFile: new DailyRotateFile({
    dirname: 'logs',
    filename: 'error',
    extension: '.log',
    level: 'error',
  }),
};

export const loggerConfig = {
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [winstonTransports.console],
};
