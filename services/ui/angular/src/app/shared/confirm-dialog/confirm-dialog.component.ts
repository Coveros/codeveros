import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ConfirmDialogData} from './ConfirmDialogData';

@Component({
  templateUrl: './confirm-dialog.component.html'
})
export class ConfirmDialogComponent {
  title: string;
  message: string;
  cancelText: string;
  confirmText: string;
  cancelId: string;
  confirmId: string;
  hideTitle: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {
    data = data || {};
    this.hideTitle = data.hideTitle || false;
    this.title = data.title || 'Confirmation';
    this.message = data.message || 'Are you sure?';
    this.cancelText = data.cancelText || 'Cancel';
    this.confirmText = data.confirmText || 'Confirm';
    this.cancelId = data.cancelId || 'cancel-button';
    this.confirmId = data.confirmId || 'confirm-button';
  }
}
