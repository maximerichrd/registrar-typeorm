import type { LoggerService } from '@nestjs/common';

import { type Logger, createLogger } from 'winston';

import { loggerConfig } from './winston-logger.config';

export class WinstonLogger implements LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger(loggerConfig);
  }

  log(message: string, ...optionalParams: string[]): Logger {
    return this.logger.info(message, { context: optionalParams });
  }

  error(message: string, ...optionalParams: string[]): Logger {
    return this.logger.error(message, { context: optionalParams });
  }

  warn(message: string, ...optionalParams: string[]): Logger {
    return this.logger.warn(message, { context: optionalParams });
  }
}
