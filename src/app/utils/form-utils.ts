import {FormArray, FormGroup} from '@angular/forms';

export class FormUtils {
  static isValidField(form: FormGroup, fieldName:string): boolean | null {
    return (
      !! form.controls[fieldName].errors && form.controls[fieldName].touched
    );
  }
  static getFieldError(form:FormGroup, fieldName: string):string | null{
    // console.log("Hay campo: " + !! this.basicForm.controls[fieldName])
    if (!form.controls[fieldName]) return null;
    // console.log("Hay errores: " + !!this.basicForm.controls[fieldName].errors)
    const errors = form.controls[fieldName].errors ?? {};
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

  static isValidFieldInArray(formArray:FormArray, index:number): boolean | null{
      return(
        formArray.controls[index].errors && formArray.controls[index].touched
      );
  }
  static getFieldErrorInArray(formArray:FormArray, index:number):string | null{
    const errors = formArray.controls[index].errors ?? {};
    for (const key of Object.keys(errors)) {
      switch (key){
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `El campo debe tener al menos ${errors['minlength'].requiredLength} caracteres`;
        case 'min':
          return `El campo debe tener un valor minimo de ${errors['min'].min}`;
      }
    }
    return null;
  }
}
