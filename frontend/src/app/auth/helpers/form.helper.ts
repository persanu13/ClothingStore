import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function LetterValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  if (!control.value) return null;

  const reg = new RegExp('^[a-zA-Z]+$');
  return reg.test(control.value) ? null : { invalidSymbols: true };
}

export function PasswordValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  if (!control.value) return null;

  const reg = new RegExp('^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])');
  return reg.test(control.value) ? null : { invalidPassword: true };
}

export const PasswordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmedPassword');

  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordMismatch: true }
    : null;
};
