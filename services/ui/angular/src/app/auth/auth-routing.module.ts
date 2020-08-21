import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AuthComponent} from './auth/auth.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forChild(routes) ]
})
export class AuthRoutingModule { }
