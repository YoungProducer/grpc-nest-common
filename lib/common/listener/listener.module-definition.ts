import { ConfigurableModuleBuilder } from '@nestjs/common';
import { ListenerOptions } from './interface/listener-options';

export const {
  ConfigurableModuleClass: ListenerModuleClass,
  MODULE_OPTIONS_TOKEN: LISTENER_OPTIONS_TOKEN,
} = new ConfigurableModuleBuilder<ListenerOptions>().build();
