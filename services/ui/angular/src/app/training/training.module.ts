import { NgModule } from '@angular/core';

import { TrainingListComponent } from './training-list/training-list.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingDialogComponent } from './training-dialog/training-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    TrainingRoutingModule,
    TrainingListComponent,
    TrainingDialogComponent,
  ],
  exports: [TrainingListComponent],
})
export class TrainingModule {}
