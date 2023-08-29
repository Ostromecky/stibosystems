import { Injectable, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ListItem } from '@stibosystems/ui/list/types';
import { Payment, PaymentItem, PaymentsService } from '@stibosystems/payments/data-access';
import { debounceTime, map, switchMap } from 'rxjs/operators';

@Injectable()
export class PaymentsFacade {
  private readonly _paymentsService = inject(PaymentsService);
  readonly $filter = signal<string>('');

  readonly $payments = toSignal(
    toObservable(this.$filter).pipe(
      debounceTime(300),
      switchMap((filter) => {
        const params = { status: filter };
        return this._paymentsService.getPayments(params);
      }),
      map((payments) => this.reduceByStatus(payments)),
      map((res) => res.map(this.toListItem))
    ),
    { initialValue: [] }
  );


  private toListItem(item: PaymentItem): ListItem<PaymentItem> {
    return { title: item.status, data: item };
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
