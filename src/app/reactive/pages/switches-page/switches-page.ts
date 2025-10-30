import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';

@Component({
  selector: 'app-switches-page',
  imports: [
      JsonPipe,
      ReactiveFormsModule
  ],
  templateUrl: './switches-page.html'
})
export class SwitchesPage {
    fb = inject(FormBuilder);
    formUtils = FormUtils;
    switchesForm = this.fb.group({
        gender:['M', Validators.required],
        allowNotifications: [true],
        acceptTerms: [false, Validators.requiredTrue]
        }
    )
    onSubmit(){
        if(this.switchesForm.invalid){
          this.switchesForm.markAllAsTouched();
          return;
        }
        console.log(this.switchesForm.value);
        this.switchesForm.reset();
        return;
    }
}
