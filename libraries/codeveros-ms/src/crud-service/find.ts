import { Context } from 'koa';
import { parseModel } from '../utils';

export async function find(ctx: Context) {
  const query = ctx.query || {};
  const Model = parseModel(ctx);
  return await Model.find(query);
}
