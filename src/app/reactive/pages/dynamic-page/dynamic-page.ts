import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';

@Component({

    selector: 'app-dynamic-page',
    imports: [
        JsonPipe,
        ReactiveFormsModule
    ],
    templateUrl: './dynamic-page.html'
})
export class DynamicPage {
    private fb = inject(FormBuilder);
    formUtils = FormUtils;
    myForm:FormGroup = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        favorites: this.fb.array([
            ['Lo-Fi', Validators.required],
            ['Hardcore', Validators.required]
        ],
        Validators.minLength(3)),
    });

    get favorites(){
        return this.myForm.get('favorites') as FormArray;
    }

    onSubmit(){
        if(this.myForm.invalid){
            this.myForm.markAllAsTouched();
            return;
        }
        console.log(this.myForm.value);
        this.myForm.reset();
    }
}
