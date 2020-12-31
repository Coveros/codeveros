import { Context } from 'koa';
import { parseModel } from '../utils';

export async function create(ctx: Context) {
  const Model = parseModel(ctx);

  const values = ctx.request.body;
  const createdItem = await Model.create(values);

  if (!createdItem || !createdItem._id) {
    ctx.throw(500, `Error creating ${Model.modelName}`);
  }
  return createdItem;
}
