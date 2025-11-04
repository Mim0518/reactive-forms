import {Component, effect, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {CountryService} from '../../services/country.service';
import {Country} from '../../interfaces/country.interfaces';
import {filter, switchMap, tap} from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [
    ReactiveFormsModule,
    JsonPipe
  ],
  templateUrl: './country-page.html'
})
export class CountryPage {
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);
  countriesByRegion = signal<Country[]>([]);
  bordersByCountry = signal<Country[]>([]);

  countryForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  });

  onFormChanged = effect((onCleanup)=>{
    const regionSubcription = this.onRegionChanged()
    const countrySubscription = this.onCountryChanged()
    onCleanup(()=>{
      regionSubcription.unsubscribe();
      countrySubscription.unsubscribe();
    });
  });


  onRegionChanged(){
    return this.countryForm.get('region')!.valueChanges
      .pipe(
        tap(() => this.countryForm.get('country')!.setValue('')),
        tap(() => this.countryForm.get('border')!.setValue('')),
        tap(() => this.countriesByRegion.set([])),
        tap(() => this.bordersByCountry.set([])),
        switchMap(region => this.countryService.getCountriesByRegion(region!))
      )
      .subscribe( (countries) => {
        this.countriesByRegion.set(countries)
      });
  }

  onCountryChanged(){
    return this.countryForm.get('country')!.valueChanges
      .pipe(
        tap( () => this.countryForm.get('border')?.setValue('')),
        filter(value => value!.length > 0),
        switchMap(alpha => this.countryService.getCountryByAlphaCode(alpha ?? '')),
        switchMap(country => this.countryService.getCountryNamesByCodeArray(country.borders))
      )
      .subscribe(( borders => {
        this.bordersByCountry.set(borders);
      }));
  }

}
