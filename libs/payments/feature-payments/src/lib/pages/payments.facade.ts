import { Injectable, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {
  PaymentFilter,
  PaymentItem,
  PaymentStatus,
  PaymentsService,
} from '@stibosystems/payments/data-access';
import { ListItem } from '@stibosystems/ui/list/types';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { StatusItem } from '../types';

@Injectable()
export class PaymentsFacade {
  private readonly _paymentsService = inject(PaymentsService);
  readonly $filter = signal<PaymentStatus | null>(null);
  readonly statusList = this.toStatusList();

  readonly $payments = toSignal(
    toObservable(this.$filter).pipe(
      debounceTime(300),
      switchMap((filter) => {
        const params = {
          status: filter,
        } as PaymentFilter;
        console.log(params);
        return this._paymentsService.getPayments(params);
      }),
      map((res) => res.map(this.toListItem))
    ),
    { initialValue: [] }
  );

  private toListItem(item: PaymentItem): ListItem<PaymentItem> {
    return { title: item.status, data: item };
  }

  private toStatusList(): StatusItem[] {
    return [
      { value: PaymentStatus.WRONG_PAYSLIP, viewValue: 'Wrong Payslio' },
      { value: PaymentStatus.SUCCESSFUL, viewValue: 'Delivery Successful' },
      { value: PaymentStatus.DECLINED, viewValue: 'Delivery Declined' },
      { value: PaymentStatus.WRONG_ADDRESS, viewValue: 'Wrong Address' },
      { value: PaymentStatus.DELIVERY_ERROR, viewValue: 'Delivery Error' },
    ];
  }
}
