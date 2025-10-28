import type { EnvironmentConfig } from '../types/environment.interface.ts';

const mergedConfig: EnvironmentConfig = {
  ...import.meta.env,
  ...globalThis._env_,
};

export const environment = {
  production: import.meta.env.PROD,
  get apiUrl() {
    return mergedConfig.REACT_APP_API_URL;
  },
};
