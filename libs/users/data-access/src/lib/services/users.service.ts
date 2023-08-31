import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { User, UserFilter, UserItem } from '../types';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly URL = 'http://localhost:3000/users';
  constructor(private readonly http: HttpClient) {}

  getUsers(params: UserFilter): Observable<UserItem[]> {
    const _params = this.toHttpParams(params);
    return this.http.get<User[]>(this.URL, { params: _params }).pipe(
      map((users) => users.map(this.toUserItem)),
      catchError((err) => {
        console.error(err);
        return of([]);
      })
    );
  }

  /**
   * TODO - move to utils
   * @param params
   * @returns
   */
  private toHttpParams(params: UserFilter): HttpParams {
    return Object.entries(params ?? {}).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        return acc.append(key, value);
      }
      return acc;
    }, new HttpParams());
  }

  private toUserItem(user: User): UserItem {
    const { firstName, lastName, avatarUrl, email } = user;
    return {
      firstName,
      lastName,
      avatarUrl,
      email,
    };
  }
}
