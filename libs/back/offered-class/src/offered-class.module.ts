import { Module } from '@nestjs/common';

import { OfferedClassController } from './offered-class.controller';
import { OfferedClassService } from './offered-class.service';

@Module({
  controllers: [OfferedClassController],
  providers: [OfferedClassService],
  exports: [OfferedClassService],
})
export class OfferedClassModule {}
