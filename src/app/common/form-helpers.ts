import { FormControl } from '@angular/forms';

export function formControlHasError<T>(
  formControl: FormControl<T>,
  errorKey: string
) {
  return formControl.touched && formControl.hasError(errorKey);
}
