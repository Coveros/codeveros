import { Component, OnInit, inject } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

import { User } from '../user.interface';
import { UserService } from '../user.service';
import { passwordMatchValidator } from '../../shared/password-match-validator/password-match-validator';
import { PasswordMatchErrorMatcher } from '../../shared/password-match-validator/password-match-error-matcher';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { UserDialogData } from './user-dialog-data.interface';

@Component({
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatDialogActions,
    MatButton,
    MatDialogClose,
  ],
})
export class UserDialogComponent implements OnInit {
  dialogRef = inject<MatDialogRef<UserDialogComponent>>(MatDialogRef);
  private readonly data = inject<UserDialogData>(MAT_DIALOG_DATA, {
    optional: true,
  });
  private readonly formBuilder = inject(UntypedFormBuilder);
  private readonly userService = inject(UserService);

  passwordErrorMatcher = new PasswordMatchErrorMatcher();
  dialogForm!: UntypedFormGroup;
  isSaving = false;
  isEdit = false;
  title = '';

  ngOnInit(): void {
    this.isEdit = !!this.data?.user?._id;
    this.title = this.isEdit ? 'Edit User' : 'Add User';

    this.dialogForm = this.formBuilder.group({
      username: [this.data?.user.username, Validators.required],
      firstName: [this.data?.user.firstName, Validators.required],
      lastName: [this.data?.user.lastName, Validators.required],
      email: [this.data?.user.email, [Validators.required, Validators.email]],
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

    const request =
      this.isEdit && this.data?.user._id
        ? this.userService.updateUser(this.data.user._id, value)
        : this.userService.createUser(value);

    request.subscribe((returnValue: User) => {
      this.isSaving = false;
      this.dialogRef.close(returnValue);
    });
  }
}
