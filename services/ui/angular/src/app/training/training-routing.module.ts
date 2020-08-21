import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {TrainingListComponent} from './training-list/training-list.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingListComponent
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forChild(routes) ]
})
export class TrainingRoutingModule { }
