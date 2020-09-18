import { NgModule } from '@angular/core';

import {UserListComponent} from './user-list/user-list.component';
import {UserDialogComponent} from './user-dialog/user-dialog.component';
import {UserRoutingModule} from './user-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    UserListComponent,
    UserDialogComponent
  ],
  imports: [
    SharedModule,
    UserRoutingModule
  ],
  exports: [
    UserListComponent
  ],
  entryComponents: [
    UserDialogComponent
  ]
})
export class UserModule { }
