import type { EnvWindow } from './env-window.type';

export const environment = {
  production: true,
  apiUrl: (window as EnvWindow).env.apiUrl || '/api',
};
