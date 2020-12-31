import { Context } from 'koa';
import { parseModel } from '../utils';

export async function findOne(ctx: Context) {
  const Model = parseModel(ctx);

  const id = ctx.params.id;

  const foundItem = await Model.findById(id);

  if (!foundItem) {
    ctx.throw(404, `${Model.modelName} not found`);
  }
  return foundItem;
}
