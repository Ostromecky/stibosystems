import { Injectable, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  PaymentFilter,
  PaymentItem,
  PaymentStatus,
  PaymentsService,
} from '@stibosystems/payments/data-access';
import { ListItem } from '@stibosystems/ui/list/types';
import { debounceTime, map, switchMap, tap } from 'rxjs/operators';
import { StatusItem } from '../types';

@Injectable()
export class PaymentsFacade {
  private readonly _paymentsService = inject(PaymentsService);
  readonly $filter = signal<PaymentStatus | null>(null);
  readonly $loading = signal<boolean>(true);
  readonly statusList = this.toStatusList();

  readonly $payments = toSignal(
    toObservable(this.$filter).pipe(
      debounceTime(300),
      switchMap((filter) => {
        this.$loading.set(true);
        const params = {
          status: filter,
        } as PaymentFilter;
        return this._paymentsService.getPayments(params);
      }),
      map((res) => res.map(this.toListItem)),
      tap(() => this.$loading.set(false))
    ),
    { initialValue: [] }
  );

  private toListItem(item: PaymentItem): ListItem<PaymentItem> {
    return { title: item.status, data: item };
  }

  private toStatusList(): StatusItem[] {
    return [
      { value: PaymentStatus.WRONG_PAYSLIP, viewValue: 'payments.status.wrong_payslip' },
      { value: PaymentStatus.SUCCESSFUL, viewValue: 'payments.status.successful' },
      { value: PaymentStatus.DECLINED, viewValue: 'payments.status.declined' },
      { value: PaymentStatus.WRONG_ADDRESS, viewValue: 'payments.status.wrong_address' },
      { value: PaymentStatus.DELIVERY_ERROR, viewValue: 'payments.status.delivery_error' },
    ];
  }
}
