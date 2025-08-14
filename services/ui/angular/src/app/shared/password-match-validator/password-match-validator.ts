import { ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator =
  (nameA: string, nameB: string): ValidatorFn =>
  (control): ValidationErrors | null => {
    const controlA = control.get(nameA);
    const controlB = control.get(nameB);
    return !controlA || !controlB || controlA.value === controlB.value
      ? null
      : { passwordMatch: true };
  };
