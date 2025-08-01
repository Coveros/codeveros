import { InjectionToken } from '@angular/core';

class TrainingConfig {
  endpoint = 'api/training';
}

const TRAINING_CONFIG = new InjectionToken<TrainingConfig>('training.config', {
  providedIn: 'root',
  factory: () => new TrainingConfig(),
});

export { TrainingConfig, TRAINING_CONFIG };
