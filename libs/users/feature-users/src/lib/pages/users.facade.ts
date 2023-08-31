import { Injectable, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ListItem } from '@stibosystems/ui/list/types';
import {
  UserFilter,
  UserItem,
  UsersService,
} from '@stibosystems/users/data-access';
import {
  combineLatest,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  map,
  scan,
  tap,
  withLatestFrom,
} from 'rxjs';

@Injectable()
export class UsersFacade {
  private readonly _usersService = inject(UsersService);
  readonly $filter = signal<string | null>(null);
  readonly $page = signal<number>(0);
  readonly $end = signal<boolean>(false);
  readonly limit = 20;

  private readonly filter$ = toObservable(this.$filter).pipe(
    tap(() => {
      this.$page.set(0);
    }),
    debounceTime(300),
    distinctUntilChanged()
  );
  private readonly page$ = toObservable(this.$page).pipe(
    distinctUntilChanged()
  );

  readonly $users = toSignal(
    combineLatest([this.filter$, this.page$]).pipe(
      concatMap(([filter, page]) => {
        const params = {
          q: filter,
          _page: page,
          _limit: this.limit,
        } as UserFilter;
        console.log(params);
        return this._usersService.getUsers(params);
      }),
      tap((arr) => this.$end.set(arr.length === 0)),
      map((res) => res.map(this.toListItem)),
      withLatestFrom(this.page$),
      scan(
        (acc, [curr, page]) =>
          page === 0 ? [...curr] : this.reducePages(acc, curr),
        [] as ListItem<UserItem>[]
      )
    ),
    { initialValue: [] }
  );

  private toListItem(item: UserItem): ListItem<UserItem> {
    return {
      title: `${item.firstName} ${item.lastName}`,
      data: item,
      avatar: item.avatarUrl,
    };
  }

  private reducePages(
    acc: ListItem<UserItem>[],
    curr: ListItem<UserItem>[]
  ): ListItem<UserItem>[] {
    return [...acc, ...curr];
  }
}
