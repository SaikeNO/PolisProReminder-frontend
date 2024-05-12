import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const greaterThan = (startControl: AbstractControl): ValidatorFn => {
  return (endControl: AbstractControl): ValidationErrors | null => {
    const startDate = new Date(startControl.value);
    const endDate = new Date(endControl.value);

    if (!startDate || !endDate) {
      return null;
    }
    if (startDate >= endDate) {
      return { greaterThan: true };
    }
    return null;
  };
};
