export type TrainingType = 'presentation' | 'workshop';

export interface Training {
  _id?: string;
  name: string;
  description: string;
  duration: number;
  type: TrainingType;
}
