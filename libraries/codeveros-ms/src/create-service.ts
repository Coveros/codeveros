import * as cors from '@koa/cors';
import * as dotenv from 'dotenv';
import { Server } from 'http';
import * as Koa from 'koa';

dotenv.config();

import { connectToDb } from './connect-to-db';
import { DbModels, DbOptions, Route, ServiceOptions } from './interfaces';
import * as middleware from './middleware';
import * as orm from './orm';
import { getLogger } from './utils';

class CodeverosMicro {
  private app = new Koa();
  private routes: Route[];
  private port = 8080;
  private dbOptions: DbOptions;
  private models: DbModels;
  private specPath: string;

  constructor(options?: ServiceOptions) {
    options = options || ({} as ServiceOptions);

    const envDbOptions = {
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      pass: process.env.DB_PASS,
      port: process.env.DB_PORT || '27017',
      user: process.env.DB_USER,
    };

    this.specPath = options.specPath || '';
    this.routes = options.routes;
    this.dbOptions = { ...envDbOptions, ...(options.dbOptions || {}) };
    this.models = options.models || ({} as DbModels);
    this.port = options.port || (process.env.PORT ? parseInt(process.env.PORT, 10) : 8080);
  }

  public start(): Server {
    const logger = getLogger();

    if (!this.dbOptions.uri && !(this.dbOptions.host && this.dbOptions.port)) {
      logger.info('Skipping database connection because necessary configuration not provided');
    } else {
      this.connectToDb();
    }
    this.initializeMiddleware();

    return this.app.listen(this.port, () => {
      logger.info(`Listening on ${this.port}`);
    });
  }

  private connectToDb() {
    const logger = getLogger();
    connectToDb(this.dbOptions).then(
      () => logger.info('connected to database'),
      (err: Error) => logger.error('Error connecting to the db: ', err),
    );
  }

  private initializeMiddleware() {
    this.app.on('error', (err, ctx) => {
      const logger = getLogger();
      if (err instanceof orm.Error.ValidationError || err.status === 401) {
        logger.info('Validation or 401 Error thrown: ', err);
      } else {
        logger.error(`Server Error - ${err.stack}`);
      }
    });

    this.app.use(middleware.initialize());
    this.app.use(middleware.timer());
    this.app.use(cors());
    this.app.use(middleware.errorHandler());
    this.app.use(middleware.setModel(this.models));
    this.app.use(middleware.setupHealthCheck());
    this.app.use(middleware.setupApiDocsRoute(this.specPath));
    this.app.use(middleware.setupApi(this.routes));
  }
}

export function createService(options: ServiceOptions) {
  return new CodeverosMicro(options);
}
