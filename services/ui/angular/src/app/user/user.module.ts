import { NgModule } from '@angular/core';

import { UserListComponent } from './user-list/user-list.component';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [SharedModule, UserListComponent, UserDialogComponent],
  exports: [UserListComponent],
})
export class UserModule {}
