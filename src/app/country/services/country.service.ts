import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {combineLatest, Observable, of} from 'rxjs';
import {Country} from '../interfaces/country.interfaces';

@Injectable({providedIn: 'root'})
export class CountryService {
  private http = inject(HttpClient)
  private baseUrl = 'https://restcountries.com/v3.1'

  private _regions = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania'
  ]

  get regions():string[]{
    return [... this._regions];
  }

  getCountriesByRegion(region:string):Observable<Country[]>{
    if(!region) return of([])
    // console.log("Region solicitada: " + region)
    const url = `${this.baseUrl}/region/${region}?fields=name,cca3,borders`
    // console.log("Url de la peticion: "+ url)
    return this.http.get<Country[]>(url)
  }

  getCountryByAlphaCode(alphaCode:string): Observable<Country>{
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=name,cca3,borders`
    console.log("Url de la peticion: "+ url)
    return this.http.get<Country>(url)
  }

  getCountryNamesByCodeArray(borders:string[]){
    if(!borders || borders.length === 0) return of([])
    const countriesResponse: Observable<Country>[] = [];
    borders.forEach(border => {
      const request = this.getCountryByAlphaCode(border);
      countriesResponse.push(request);
    });
    return combineLatest(countriesResponse)
  }
}
