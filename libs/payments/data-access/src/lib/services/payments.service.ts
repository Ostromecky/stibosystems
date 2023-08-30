import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Payment, PaymentFilter, PaymentItem } from '../types';

@Injectable({ providedIn: 'root' })
export class PaymentsService {
  private readonly URL = 'http://localhost:3000/payments';
  constructor(private readonly http: HttpClient) {}

  getPayments(params: PaymentFilter): Observable<PaymentItem[]> {
    const _params = this.toHttpParams(params);
    return this.http
      .get<Payment[]>(this.URL, { params: _params })
      .pipe(map((payments) => this.reduceByStatus(payments)));
  }

  private toHttpParams(params: PaymentFilter): HttpParams {
    return Object.entries(params ?? {}).reduce((acc, [key, value]) => {
      if (value) {
        return acc.append(key, value);
      }
      return acc;
    }, new HttpParams());
  }

  private reduceByStatus(payments: Payment[]): PaymentItem[] {
    return payments.reduce((acc, curr) => {
      if (acc.some((item) => item.status === curr.status)) {
        const idx = acc.findIndex((item) => item.status === curr.status);
        acc[idx].count += 1;
      } else {
        acc.push({ status: curr.status, count: 1 });
      }
      return acc;
    }, [] as PaymentItem[]);
  }
}
