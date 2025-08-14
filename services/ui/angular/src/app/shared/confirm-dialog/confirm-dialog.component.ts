import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { ConfirmDialogData } from './ConfirmDialogData';
import { MatButton } from '@angular/material/button';

@Component({
  templateUrl: './confirm-dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class ConfirmDialogComponent {
  private readonly data = inject<ConfirmDialogData>(MAT_DIALOG_DATA);

  title: string;
  message: string;
  cancelText: string;
  confirmText: string;
  cancelId: string;
  confirmId: string;
  hideTitle: boolean;

  constructor() {
    this.hideTitle = this.data.hideTitle || false;
    this.title = this.data.title || 'Confirmation';
    this.message = this.data.message || 'Are you sure?';
    this.cancelText = this.data.cancelText || 'Cancel';
    this.confirmText = this.data.confirmText || 'Confirm';
    this.cancelId = this.data.cancelId || 'cancel-button';
    this.confirmId = this.data.confirmId || 'confirm-button';
  }
}
