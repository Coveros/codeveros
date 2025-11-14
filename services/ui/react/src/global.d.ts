import type { EnvironmentConfig } from 'src/types/environment.config.ts';

declare global {
  var _env_: EnvironmentConfig;
}
