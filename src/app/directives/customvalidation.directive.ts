import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, FormGroup, ValidationErrors, RequiredValidator, Validators } from '@angular/forms';

@Directive({
  selector: '[appCustomvalidation]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: CustomvalidationDirective, multi: true }
  ]
})
export class CustomvalidationDirective implements Validator {

  constructor() { }

  validate(form: FormGroup): ValidationErrors {
    const message = {
      username: {
        message: ''
      },
      password: {
        message: ''
      }
    };
    const username = form.controls && form.controls.username;
    const password = form.controls && form.controls.password;
    if (username) {
      if (!username.value) {
        message.username.message = 'This field is required';
      } else if (username.value !== 'demo1') {
        message.username.message = 'username should be demo1';
      }
    }
    if (password) {
      if (!password.value) {
        message.password.message = 'This field is required';
      } else if (password.value !== 'demo1') {
        message.password.message = 'password should be demo1';
      }
    }
    return message;
  }
}
