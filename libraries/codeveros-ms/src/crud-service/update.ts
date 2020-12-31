import { Context } from 'koa';
import { parseModel } from '../utils';

export async function update(ctx: Context) {
  const Model = parseModel(ctx);

  const id = ctx.params.id;
  const values = ctx.request.body;

  const foundItem = await Model.findById(id);

  if (!foundItem || !foundItem._id) {
    ctx.throw(404, `${Model.modelName} not found`);
  }

  const updated = await Model.findByIdAndUpdate(id, values, { new: true });

  if (!updated || !updated._id) {
    ctx.throw(500, `Error updating ${Model.modelName}`);
  }

  return updated;
}
