import { Context, Middleware } from 'koa';
import * as Router from 'koa-better-router';
import * as koaBody from 'koa-body';

import { Route } from './interfaces';
import * as orm from './orm';
import { getApiSpec, getLogger } from './utils';

export function timer(): Middleware {
  return async (ctx, next) => {
    if (ctx.path !== '/health-check') {
      ctx.codeveros.logger.info(`Request for ${ctx.method} ${ctx.path} received at ${Date.now()}`);
    }
    await next();
  };
}

export function initialize(): Middleware {
  return async (ctx, next) => {
    ctx.codeveros = {
      Model: null,
      logger: getLogger(),
    };
    await next();
  };
}

export function errorHandler(): Middleware {
  return async (ctx, next) => {
    const logger = ctx.codeveros.logger;
    try {
      await next();
    } catch (err) {
      if (err instanceof orm.Error.ValidationError) {
        logger.verbose('Caught Validation Error: ', err);
        ctx.status = 400;
        ctx.body = {
          invalidAttributes: {},
          status: 400,
        };

        for (const field in err.errors) {
          if (err.errors.hasOwnProperty(field)) {
            const error = err.errors[field];
            ctx.body.invalidAttributes[field] = [{ rule: error.kind, message: error.message }];
          }
        }
      } else {
        logger.error('Caught Error with request: ', err);
        ctx.status = err.status || 500;
        ctx.body = { msg: err.expose && err.message ? err.message : 'Error performing action' };
      }
      ctx.app.emit('error', err, ctx);
    }
  };
}

export function setModel(models: { [key: string]: any }): Middleware {
  return async (ctx, next) => {
    const path = ctx.originalUrl;
    const matches = path.match(/^\/api\/(\w+).*$/);
    if (matches && matches[1] && models[matches[1]]) {
      ctx.codeveros.Model = models[matches[1]];
    }
    await next();
  };
}

export function setupHealthCheck(): Middleware {
  const router = Router();
  router.addRoute('GET /health-check', (ctx: Context) => {
    ctx.status = 200;
  });
  return router.middleware();
}

export function setupApiDocsRoute(specPath: string = ''): Middleware {
  const router = Router();

  router.addRoute('GET /api/docs', async (ctx: Context) => {
    const logger = ctx.codeveros.logger;
    logger.verbose('Retrieving API docs');

    try {
      ctx.body = await getApiSpec(specPath);
    } catch (e) {
      logger.error('Failed to load API docs');
      ctx.throw(500, 'Failed to load API docs');
    }
  });
  return router.middleware();
}

export function setupApi(routes: Route[]): Middleware {
  const api = Router({ prefix: '/api' });
  api.addRoutes(
    routes.map((route: Route) => {
      return api.createRoute(route.path, [koaBody(), route.action]);
    }),
  );
  return api.middleware();
}
