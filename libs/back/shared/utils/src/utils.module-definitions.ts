import { ConfigurableModuleBuilder } from '@nestjs/common';

import type { UtilsModuleOptions } from './interfaces/utils-module-options.interface';

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<UtilsModuleOptions>().build();
