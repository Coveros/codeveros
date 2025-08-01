import { Component, Inject, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { User } from '../user.interface';
import { UserService } from '../user.service';
import { passwordMatchValidator } from '../../shared/password-match-validator/password-match-validator';
import { PasswordMatchErrorMatcher } from '../../shared/password-match-validator/password-match-error-matcher';

@Component({
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  standalone: false,
})
export class UserDialogComponent implements OnInit {
  passwordErrorMatcher = new PasswordMatchErrorMatcher();
  user: User;
  dialogForm: UntypedFormGroup;
  isSaving = false;
  isEdit = false;
  title: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    private formBuilder: UntypedFormBuilder,
    private userService: UserService,
  ) {
    this.user = data.user || {};
  }

  ngOnInit(): void {
    this.isEdit = !!(this.user && this.user._id);
    this.title = this.isEdit ? 'Edit User' : 'Add User';

    this.dialogForm = this.formBuilder.group({
      username: [this.user.username, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });

    if (!this.isEdit) {
      this.dialogForm.addControl(
        'password',
        new UntypedFormControl('', Validators.required),
      );
      this.dialogForm.addControl(
        'confirmPassword',
        new UntypedFormControl('', Validators.required),
      );
      this.dialogForm.setValidators(
        passwordMatchValidator('password', 'confirmPassword'),
      );
    }
  }

  onSubmit() {
    if (this.isSaving || this.dialogForm.invalid) {
      return;
    }

    this.isSaving = true;

    const value: User = this.dialogForm.value;

    const request = this.isEdit
      ? this.userService.updateUser(this.user._id, value)
      : this.userService.createUser(value);

    request.subscribe((returnValue: User) => {
      this.isSaving = false;
      this.dialogRef.close(returnValue);
    });
  }
}
