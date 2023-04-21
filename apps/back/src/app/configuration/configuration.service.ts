import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { TypeOrmModuleOptions } from '@nestjs/typeorm';

import type { Configuration } from './configuration';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService<Configuration, true>) {}

  getDatabaseConf(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<'postgres'>('DB_TYPE'),
      host: this.configService.get<string>('DB_HOST'),
      port: Number(this.configService.get<string>('DB_PORT')),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),
      logging: stringToBoolean(
        this.configService.get<'false' | 'true'>('DB_LOGGING')
      ),
      autoLoadEntities: true,
    };
  }
}

const stringToBoolean = (value: 'false' | 'true'): boolean => {
  return value === 'true';
};
