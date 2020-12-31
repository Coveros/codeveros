import { Context } from 'koa';
import { Document, Model } from '../orm';

export function parseModel<T extends Document>(ctx: Context): Model<T> {
  const model = ctx && ctx.hasOwnProperty('codeveros') && ctx.codeveros.hasOwnProperty('Model') && ctx.codeveros.Model;
  return model ? model : ctx.throw(400, 'Model not found for route');
}
