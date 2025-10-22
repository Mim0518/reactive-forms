import {Component, inject} from '@angular/core';
import {JsonPipe} from '@angular/common';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
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
        favorites: this.fb.array(
        [
        ],
        Validators.minLength(3)
        ),
    });

    newFavoriteItem = new FormControl('', Validators.required)

    get favorites(){
        return this.myForm.get('favorites') as FormArray;
    }
    set favorites(value: FormArray){
        this.myForm.setControl('favorites', value);
    }

    onSubmit(){
        if(this.myForm.invalid){
            this.myForm.markAllAsTouched();
            return;
        }
        console.log(this.myForm.value);
        this.favorites = this.fb.array([]);
        this.myForm.reset();
    }

    onAddFavorite(){
        if(this.newFavoriteItem.invalid) return;
        const newFavorite = this.newFavoriteItem.value;
        this.favorites.push(this.fb.control(newFavorite, Validators.required));
        this.newFavoriteItem.reset();
    }

    onRemoveFavorite(index:number){
        this.favorites.removeAt(index);
    }
}
