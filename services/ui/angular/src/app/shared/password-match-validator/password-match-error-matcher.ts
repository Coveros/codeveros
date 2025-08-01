import { ErrorStateMatcher } from '@angular/material/core';
import { UntypedFormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class PasswordMatchErrorMatcher implements ErrorStateMatcher {
  isErrorState(
    control: UntypedFormControl | null,
    form: FormGroupDirective | NgForm | null,
  ): boolean {
    if (!control || !form) {
      return false;
    }
    return (
      (control.dirty || control.touched) &&
      (control.invalid || form.hasError('passwordMatch'))
    );
  }
}
