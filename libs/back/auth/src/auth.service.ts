import { Inject, Injectable } from '@nestjs/common';

import { MODULE_OPTIONS_TOKEN } from './auth.module-definitions';
import { type AuthModuleOptions } from './interfaces/auth-module-options.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: AuthModuleOptions
  ) {}
}
