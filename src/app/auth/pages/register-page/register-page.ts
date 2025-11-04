import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';



@Component({
  selector: 'app-register-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './register-page.html'
})

export class RegisterPage {
    fb = inject(FormBuilder);
    formUtils = FormUtils;
    registerForm = this.fb.group({
        name: [
          '',
          [Validators.required, Validators.pattern(FormUtils.namePattern)]
        ],
        email: [
          '',
          [Validators.required, Validators.pattern(FormUtils.emailPattern)],
          [FormUtils.checkServerResponse]
        ],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(FormUtils.notOnlySpacesPattern),
            FormUtils.takenUsername
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6)]
        ],
        confirmPassword: [
          '',
          [
            Validators.required,
            Validators.minLength(6)
          ]
        ]
    }, {
      validators:[
        FormUtils.sameValueOnFields('password', 'confirmPassword')
      ]
    });



    onSubmit(){
      if(this.registerForm.invalid){
        this.registerForm.markAllAsTouched();
        console.log(this.registerForm.value);
        return;
      }
      this.registerForm.reset()
      console.log(this.registerForm.value);
    }
}
