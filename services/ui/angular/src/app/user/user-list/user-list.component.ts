import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort, MatSortHeader } from '@angular/material/sort';

import { User } from '../user.interface';
import { UserService } from '../user.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { CovTableSource } from '../../shared/cov-table-source';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import {
  MatTable,
  MatColumnDef,
  MatHeaderCellDef,
  MatHeaderCell,
  MatCellDef,
  MatCell,
  MatHeaderRowDef,
  MatHeaderRow,
  MatRowDef,
  MatRow,
} from '@angular/material/table';
import { UserDialogData } from '../user-dialog/user-dialog-data.interface';

@Component({
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  imports: [
    MatIconButton,
    MatTooltip,
    MatIcon,
    MatTable,
    MatSort,
    MatColumnDef,
    MatHeaderCellDef,
    MatHeaderCell,
    MatSortHeader,
    MatCellDef,
    MatCell,
    MatHeaderRowDef,
    MatHeaderRow,
    MatRowDef,
    MatRow,
  ],
})
export class UserListComponent implements OnInit {
  private readonly confirmDialogService = inject(ConfirmDialogService);
  private readonly matDialog = inject(MatDialog);
  private readonly userService = inject(UserService);
  private readonly matSnackBar = inject(MatSnackBar);

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns = ['username', 'firstName', 'lastName', 'email', 'actions'];
  loading = true;
  dataSource = new CovTableSource<User>();

  ngOnInit(): void {
    this.dataSource.sort = this.sort;

    this.userService.getAll().subscribe((users) => {
      this.loading = false;
      this.dataSource.data = users;
    });
  }

  openAddDialog(): void {
    const dialogRef = this.matDialog.open(UserDialogComponent, {
      width: '750px',
      maxWidth: '95%',
    });

    dialogRef.afterClosed().subscribe((newUser: User) => {
      if (newUser) {
        this.dataSource.data = [newUser, ...this.dataSource.data];
        this.matSnackBar.open(
          `User: ${newUser.firstName} ${newUser.lastName} added`,
        );
      }
    });
  }

  editUser(user: User) {
    const dialogRef = this.matDialog.open<UserDialogComponent, UserDialogData>(
      UserDialogComponent,
      {
        width: '750px',
        maxWidth: '95%',
        data: { user },
      },
    );

    dialogRef.afterClosed().subscribe((updated: User) => {
      if (updated) {
        const index = this.dataSource.data.findIndex(
          (t) => t._id === updated._id,
        );
        if (index > -1) {
          const currUsers = [...this.dataSource.data];
          currUsers[index] = updated;
          this.dataSource.data = currUsers;
        }
        this.matSnackBar.open(
          `User: ${updated.firstName} ${updated.lastName} updated`,
        );
      }
    });
  }

  deleteUser(user: User) {
    this.confirmDialogService
      .open({
        title: 'Remove User?',
        message: `Are you sure you want to remove ${user.firstName} ${user.lastName}?`,
        cancelId: 'cancel-user-delete',
        confirmId: 'confirm-user-delete',
        confirmText: 'Remove',
      })
      .subscribe((confirmed) => {
        if (confirmed) {
          this.userService.deleteUser(user._id).subscribe((deletedUser) => {
            this.dataSource.data = this.dataSource.data.filter(
              (t: User) => t._id !== deletedUser._id,
            );
            this.matSnackBar.open(
              `User ${deletedUser.firstName} ${deletedUser.lastName} removed`,
            );
          });
        }
      });
  }
}
