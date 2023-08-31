import { Injectable, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ListItem } from '@stibosystems/ui/list/types';
import {
  CountriesService,
  CountryFilter,
  CountryItem,
} from '@stibosystems/countries/data-access';
import { debounceTime, map, switchMap } from 'rxjs';

@Injectable()
export class CountriesFacade {
  private readonly _countriesService = inject(CountriesService);
  readonly $filter = signal<string | null>(null);

  readonly $payments = toSignal(
    toObservable(this.$filter).pipe(
      debounceTime(300),
      switchMap((filter) => {
        const params = {
          q: filter,
        } as CountryFilter;
        return this._countriesService.getCountries(params);
      }),
      map((res) => res.map(this.toListItem))
    ),
    { initialValue: [] }
  );

  private toListItem(item: CountryItem): ListItem<CountryItem> {
    return { title: item.name, data: item, avatar: item.flag };
  }
}
