import { UntypedFormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator =
  (nameA: string, nameB: string): ValidatorFn =>
  (formGroup: UntypedFormGroup): ValidationErrors | null => {
    const controlA = formGroup.get(nameA);
    const controlB = formGroup.get(nameB);
    return !controlA || !controlB || controlA.value === controlB.value ? null : { passwordMatch: true };
  };
