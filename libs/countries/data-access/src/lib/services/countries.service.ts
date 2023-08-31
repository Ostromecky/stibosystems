import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { Country, CountryFilter, CountryItem } from '../types';

@Injectable({ providedIn: 'root' })
export class CountriesService {
  private readonly URL = 'http://localhost:3000/countries';
  constructor(private readonly http: HttpClient) {}

  getCountries(params: CountryFilter): Observable<CountryItem[]> {
    const _params = this.toHttpParams(params);
    return this.http.get<Country[]>(this.URL, { params: _params }).pipe(
      map((countries) => countries.map(this.toCountryItem)),
      map((countries) => this.removeDuplicates(countries)),
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );
  }

  private toHttpParams(params: CountryFilter): HttpParams {
    return Object.entries(params ?? {}).reduce((acc, [key, value]) => {
      if (value) {
        return acc.append(key, value);
      }
      return acc;
    }, new HttpParams());
  }

  private toCountryItem(country: Country): CountryItem {
    const { name, code, flag } = country;
    return {
      name,
      code,
      flag,
      prefix: '',
    };
  }

  private removeDuplicates(countries: CountryItem[]): CountryItem[] {
    return countries.reduce((acc, curr) => {
      if (!acc.some((item) => item.name === curr.name)) {
        acc.push(curr);
      }
      return acc;
    }, [] as CountryItem[]);
  }
}
