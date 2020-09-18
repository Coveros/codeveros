import {FormGroup, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordMatchValidator(nameA: string, nameB: string): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const controlA = formGroup.get(nameA);
    const controlB = formGroup.get(nameB);
    return (!controlA || !controlB || controlA.value === controlB.value) ? null : {passwordMatch: true};
  };
}
