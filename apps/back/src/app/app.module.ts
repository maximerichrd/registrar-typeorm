import { Module } from '@nestjs/common';

import { ConfigurationModule } from './configuration/configuration.module';
import { TypeormConfigurationModule } from './typeorm/typeorm.module';
import { AuthModule } from '@demo/back/auth';

@Module({
  imports: [
    // ConfigurationModule must always be first
    ConfigurationModule,
    TypeormConfigurationModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
