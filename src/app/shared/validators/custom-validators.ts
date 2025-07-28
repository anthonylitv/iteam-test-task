import { ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static noWhiteSpace: ValidatorFn = (control) => {
    return control.value?.toString().trim().length ? null : { required: true };
  };
}
