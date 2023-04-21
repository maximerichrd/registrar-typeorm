import { Module } from '@nestjs/common';

import { ConfigurationModule } from './configuration/configuration.module';
import { TypeormConfigurationModule } from './typeorm/typeorm.module';
import { AuthModule } from '@demo/back/auth';
import { StudentModule } from '@demo/back/student';
import { OfferedClassModule } from '@demo/back/offered-class';

@Module({
  imports: [
    // ConfigurationModule must always be first
    ConfigurationModule,
    TypeormConfigurationModule,
    AuthModule,
    StudentModule,
    OfferedClassModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
