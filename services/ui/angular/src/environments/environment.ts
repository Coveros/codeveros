import type { EnvWindow } from './env-window.type';

export const environment = {
  production: false,
  apiUrl: (window as EnvWindow).env.apiUrl || '/api',
};
