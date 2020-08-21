import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import { SwaggerComponent } from './swagger.component';

const routes: Routes = [
  {
    path: '',
    component: SwaggerComponent
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forChild(routes) ]
})
export class SwaggerRoutingModule { }
