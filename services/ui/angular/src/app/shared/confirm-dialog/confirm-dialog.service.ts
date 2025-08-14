import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { Observable } from 'rxjs';
import { ConfirmDialogData } from './ConfirmDialogData';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  private readonly matDialog = inject(MatDialog);

  open(data: ConfirmDialogData = {}): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, { data });
    return dialogRef.afterClosed();
  }
}
