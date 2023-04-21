import { Module } from '@nestjs/common';

import { ConfigurableModuleClass } from './utils.module-definitions';
import { UtilsService } from './utils.service';

@Module({
  controllers: [],
  providers: [UtilsService],
  exports: [UtilsService],
})
export class UtilsModule extends ConfigurableModuleClass {}
