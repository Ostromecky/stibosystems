import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment, PaymentFilter } from '../types';

@Injectable({ providedIn: 'root' })
export class PaymentsService {
  private readonly URL = 'http://localhost:3000/payments';
  constructor(private readonly http: HttpClient) {}

  getPayments(params: PaymentFilter): Observable<Payment[]> {
    const _params = this.toHttpParams(params);
    return this.http.get<Payment[]>(this.URL, { params: _params });
  }

  toHttpParams(params: PaymentFilter): HttpParams {
    return Object.entries(params).reduce((acc, [key, value]) => {
      if (value) {
        return acc.append(key, value);
      }
      return acc;
    }, new HttpParams());
  }
}
