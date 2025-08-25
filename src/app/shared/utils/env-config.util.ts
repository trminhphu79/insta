import { EnvironmentProviders, InjectionToken, Provider } from '@angular/core';
import { IEnvironmentConfig } from '@shared/interfaces/env-config.interface';

export const CONFIG_TOKEN = new InjectionToken<IEnvironmentConfig>(
  'CONFIG_TOKEN'
);

export const provideConfiguration = (config: IEnvironmentConfig): Provider => {
  return {
    provide: CONFIG_TOKEN,
    useValue: config,
  };
};
