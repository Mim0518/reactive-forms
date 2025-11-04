import {AbstractControl, FormArray, FormGroup} from '@angular/forms';

async function sleep(){
  return new Promise(resolve => setTimeout(resolve, 1000));
}

export class FormUtils {
  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

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
        case 'email':
          return `El campo debe ser un correo valido`;
        case 'pattern':
          return `El campo debe tener un formato valido`;
        case 'takenUsername':
          return `El nombre de usuario ya esta en uso`;
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

  static sameValueOnFields(firstField: string, secondField: string ){
    return (formGroup: AbstractControl) => {
      const fistFieldValue = formGroup.get(firstField)?.value;
      const secondFieldValue = formGroup.get(secondField)?.value;

      return fistFieldValue === secondFieldValue ? null : {
        differentValues: true
      }
    };
  }

  static async checkServerResponse(control: AbstractControl){
    console.log('triggering validator')
    await sleep();
    const formValue = control.value;
    if(formValue === 'hola@mundo.com'){
      console.log('email taken')
      return {
        emailTaken: true
      };
    }
    return null;
  }

  static takenUsername(control: AbstractControl){
    const value = control.value;
    return value === 'administrador' ? {takenUsername: true} : null;

  }
}
