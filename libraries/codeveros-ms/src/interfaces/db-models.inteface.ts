import { Model } from '../orm';

export interface DbModels {
  [modelName: string]: Model<any>;
}
