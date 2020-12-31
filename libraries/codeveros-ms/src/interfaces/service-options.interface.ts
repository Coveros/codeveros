import { DbModels } from './db-models.inteface';
import { DbOptions } from './db-options.interface';
import { Route } from './route.interface';

export interface ServiceOptions {
  routes: Route[];
  models?: DbModels;
  port?: number;
  dbOptions?: DbOptions;
  specPath?: string;
}
