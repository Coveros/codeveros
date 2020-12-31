import * as orm from '../orm';

export function loadModel<T extends orm.Document>(name: string, schema: orm.Schema): orm.Model<T> {
  if (orm.models[name]) {
    return orm.models[name];
  }
  return orm.model<T>(name, schema);
}
