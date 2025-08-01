export enum TrainingType {
  Presentation = 'presentation',
  Workshop = 'workshop',
}

export interface Training {
  _id?: string;
  name: string;
  description: string;
  duration: number;
  type: TrainingType;
}
