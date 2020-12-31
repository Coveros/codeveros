import * as orm from '../orm';

export function getModel(modelName: string): orm.Model<any> {
  return orm.models[modelName];
}
