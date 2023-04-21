import { ConfigService } from '@nestjs/config';

import type { DataSourceOptions } from 'typeorm';
import { DataSource } from 'typeorm';

import type { Configuration } from '../configuration/configuration';

const configurationService = new ConfigService<Configuration, true>();
const options: DataSourceOptions = {
  type: configurationService.get<'mysql' | 'mariadb'>('DB_TYPE'),
  host: configurationService.get<string>('DB_HOST'),
  port: Number(configurationService.get<string>('DB_PORT')),
  username: configurationService.get<string>('DB_USERNAME'),
  password: configurationService.get<string>('DB_PASSWORD'),
  database: configurationService.get<string>('DB_DATABASE'),
  entities: [configurationService.get<string>('DB_ENTITY')],
  migrations: [configurationService.get<string>('DB_MIGRATION')],
};

export default new DataSource(options);
