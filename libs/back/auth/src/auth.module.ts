import { Module } from '@nestjs/common';

import { AuthController } from './auth.controller';
import { ConfigurableModuleClass } from './auth.module-definitions';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule extends ConfigurableModuleClass {}
