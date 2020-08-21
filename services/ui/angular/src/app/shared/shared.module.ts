import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import { MatSortModule } from '@angular/material/sort';

const mdModules = [
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
];

const exportedModules = [
  CommonModule,
  FlexModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  ...mdModules
];

@NgModule({
  imports: [ ...exportedModules ],
  exports: [ ...exportedModules ],
  declarations: [ ConfirmDialogComponent ],
  entryComponents: [ ConfirmDialogComponent ]
})
export class SharedModule {}
