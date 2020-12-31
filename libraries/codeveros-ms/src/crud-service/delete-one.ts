import { Context } from 'koa';
import { parseModel } from '../utils';

export async function deleteOne(ctx: Context) {
  const Model = parseModel(ctx);

  const id = ctx.params.id;

  const foundItem = await Model.findById(id);
  if (!foundItem) {
    ctx.throw(404, `${Model.modelName} not found`);
  }

  const deletedItem = await Model.findByIdAndRemove(id);

  if (!deletedItem) {
    ctx.throw(500, `Error deleting ${Model.modelName}`);
  }

  return deletedItem;
}
