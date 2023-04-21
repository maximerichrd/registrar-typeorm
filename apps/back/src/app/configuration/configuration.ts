import { ConfigService } from '@nestjs/config';

import { plainToInstance } from 'class-transformer';
import { validateSync, IsNumber, IsString, IsBoolean } from 'class-validator';

export class Configuration {
  @IsString()
  FRONTEND_URL!: string;

  @IsNumber()
  PORT!: number;

  @IsNumber()
  DB_PORT!: number;

  @IsString()
  DB_HOST!: string;

  @IsString()
  DB_USERNAME!: string;

  @IsString()
  DB_PASSWORD!: string;

  @IsString()
  DB_DATABASE!: string;

  @IsString()
  DB_TYPE!: string;

  @IsBoolean()
  DB_LOGGING!: boolean;

  @IsString()
  DB_ENTITY!: string;

  @IsString()
  DB_MIGRATION!: string;
}

export const ConfigurationService = ConfigService<Configuration, true>;

export function validate(config: Record<string, string | number>) {
  const validatedConfig = plainToInstance(Configuration, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
