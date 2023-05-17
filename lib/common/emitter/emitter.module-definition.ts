import { ConfigurableModuleBuilder } from '@nestjs/common';
import { EmitterOptions } from './interfaces/emitter-options';

export const {
  ConfigurableModuleClass: EmitterModuleClass,
  MODULE_OPTIONS_TOKEN: EMITTER_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<EmitterOptions>().build();
