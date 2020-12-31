import { Context } from 'koa';
import * as crudService from './crud-service';

export async function create(ctx: Context) {
  ctx.body = await crudService.create(ctx);
}

export async function deleteOne(ctx: Context) {
  ctx.body = await crudService.deleteOne(ctx);
}

export async function find(ctx: Context) {
  ctx.body = await crudService.find(ctx);
}

export async function findOne(ctx: Context) {
  ctx.body = await crudService.findOne(ctx);
}

export async function update(ctx: Context) {
  ctx.body = await crudService.update(ctx);
}
