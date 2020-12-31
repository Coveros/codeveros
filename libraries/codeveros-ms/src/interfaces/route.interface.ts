import { Middleware } from 'koa';

export interface Route {
  path: string;
  action: Middleware;
}
