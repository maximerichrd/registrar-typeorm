import { Inject, Injectable } from '@nestjs/common';

import { type UtilsModuleOptions } from './interfaces/utils-module-options.interface';
import { MODULE_OPTIONS_TOKEN } from './utils.module-definitions';

@Injectable()
export class UtilsService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: UtilsModuleOptions
  ) {}
}
