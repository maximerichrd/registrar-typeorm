import { Module } from '@nestjs/common';

import { ConfigurationModule } from './configuration/configuration.module';
import { TypeormConfigurationModule } from './typeorm/typeorm.module';

@Module({
  imports: [
    // ConfigurationModule must always be first
    ConfigurationModule,
    TypeormConfigurationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
