import type { EnvironmentConfig } from 'types/environment.interface';

declare global {
  var _env_: EnvironmentConfig;
}
