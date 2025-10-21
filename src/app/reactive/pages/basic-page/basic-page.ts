import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormUtils} from '../../../utils/form-utils';

@Component({
  selector: 'app-basic-page',
  imports: [
    JsonPipe,
    ReactiveFormsModule
  ],
  templateUrl: './basic-page.html'
})
export class BasicPage {
    // myForm = new FormGroup({
    //   name: new FormControl(''),
    //   price: new FormControl(0),
    //   stock: new FormControl(0)
    // });

    private formBuilder = inject(FormBuilder);
    formUtils = FormUtils;
    basicForm:FormGroup = this.formBuilder.group({
                 /*Validaciones Sincronas*/
      name: ['', [Validators.required, Validators.minLength(3)], [/*Validaciones Asincronas*/]],
      price: [0, [Validators.required, Validators.min(1)]],
      stock: [0, [Validators.required, Validators.min(0)]]
    });

    isValidField(fieldName:string): boolean | null {
      // console.log("Validando campo: ", fieldName)
      // console.log(this.basicForm.controls[fieldName].errors)
      return (
        this.basicForm.controls[fieldName].errors &&
        this.basicForm.controls[fieldName].touched
      );
    }

    getFieldError(fieldName: string):string | null{
      // console.log("Hay campo: " + !! this.basicForm.controls[fieldName])
      if (!this.basicForm.controls[fieldName]) return null;
      // console.log("Hay errores: " + !!this.basicForm.controls[fieldName].errors)
      const errors = this.basicForm.controls[fieldName].errors ?? {};
      for (const key of Object.keys(errors)) {
        // console.log("key: " + key)
        switch (key){
          case 'required':
            // console.log("Este campo es requerido")0
            return 'Este campo es requerido';
          case 'minlength':
            // console.log("El campo debe tener al menos 3 caracteres")
            return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
          case 'min':
            // console.log("El campo debe tener un valor minimo de 0")
            return `El campo debe tener un valor minimo de ${errors['min'].min}`;
        }
      }
      // console.log("No hay errores")
      return null;
    }

    onSubmit(){
      if(this.basicForm.invalid){
        this.basicForm.markAllAsTouched();
        return;
      }
      console.log(this.basicForm.value);
      this.basicForm.reset();
    }
}
