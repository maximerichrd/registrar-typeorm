import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigurationModule } from '../configuration/configuration.module';
import { ConfigurationService } from '../configuration/configuration.service';

import {
  StudentEntity,
  OfferedClassEntity
} from '@demo/back/shared/data-testdb'

@Module({
  imports: [
    ConfigurationModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (config: ConfigurationService) => {
        return {
          ...config.getDatabaseConf(),
          entities: [
            StudentEntity,
            OfferedClassEntity
          ],
        };

      },
      inject: [ConfigurationService],
    }),
  ],
})
export class TypeormConfigurationModule {}
