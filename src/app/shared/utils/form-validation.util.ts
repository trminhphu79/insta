import {
  AbstractControl,
  FormControlOptions,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export const withValidation = (
  validators: ValidatorFn | ValidatorFn[] | null | undefined,
  nonNullable: boolean = true
): FormControlOptions => {
  return {
    nonNullable,
    validators,
  };
};

export function controlsMatchValidator(
  key: string,
  targetKey: string
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(key)?.value;
    const confirm = group.get(targetKey)?.value;

    if (!password || !confirm) return null;
    return password === confirm ? null : { controlMismatch: true };
  };
}

export const passwordValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;

    if (!value) return null;

    const errors: any = {};

    if (value.length < 8) {
      errors.minLength = true;
    }
    if (value.length > 20) {
      errors.maxLength = true;
    }

    if (!/[A-Z]/.test(value)) {
      errors.uppercase = true;
    }

    if (!/[0-9]/.test(value)) {
      errors.number = true;
    }

    return Object.keys(errors).length ? errors : null;
  };
};
