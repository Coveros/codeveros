import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {UserListComponent} from './user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forChild(routes) ]
})
export class UserRoutingModule { }
