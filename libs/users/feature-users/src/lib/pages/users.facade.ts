import { Injectable, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ListItem } from '@stibosystems/ui/list/types';
import {
  UserFilter,
  UserItem,
  UsersService,
} from '@stibosystems/users/data-access';
import { debounceTime, map, switchMap } from 'rxjs';

@Injectable()
export class UsersFacade {
  private readonly _usersService = inject(UsersService);
  readonly $filter = signal<string | null>(null);

  readonly $users = toSignal(
    toObservable(this.$filter).pipe(
      debounceTime(300),
      switchMap((filter) => {
        const params = {
          q: filter,
        } as UserFilter;
        return this._usersService.getUsers(params);
      }),
      map((res) => res.map(this.toListItem))
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
}
